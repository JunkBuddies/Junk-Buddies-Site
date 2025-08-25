// api/lead.js — Save chat/estimate lead to Firestore (Firebase Admin)
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

function getServiceAccount() {
  // Option A: one env JSON blob (preferred)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error("FIREBASE_SERVICE_ACCOUNT JSON parse error:", e);
    }
  }
  // Option B: 3 separate envs
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
  if (privateKey.startsWith('"')) {
    // Vercel may wrap it in quotes—strip and unescape
    privateKey = privateKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
  } else {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }
  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey };
  }
  return null;
}

function initFirebase() {
  if (!getApps().length) {
    const svc = getServiceAccount();
    if (!svc) throw new Error("Missing Firebase service account envs.");
    initializeApp({
      credential: cert({
        projectId: svc.projectId,
        clientEmail: svc.clientEmail,
        privateKey: svc.privateKey,
      }),
    });
  }
  return getFirestore();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const db = initFirebase();

    const {
      sessionId,
      contact = {},        // { name, phone, email }
      address = {},        // { street, city, state, zip } (optional)
      parsed = {},         // { cart, finalPrice, totalVolume, loadLabel }
      messages = [],       // last few messages (optional)
      meta = {},           // { ai: 'on'|'off', mode?: 'chat'|'estimate'|'both' }
      source = "website-chat",
    } = req.body || {};

    const name  = String(contact.name || "").trim();
    const phone = String(contact.phone || "").trim();
    const email = String(contact.email || "").trim();

    // Minimal validation: need *some* way to contact
    if (!phone && !email) {
      return res.status(400).json({ ok: false, error: "phone_or_email_required" });
    }

    const doc = {
      sessionId: sessionId || null,
      source,
      contact: { name: name || null, phone: phone || null, email: email || null },
      address: {
        street: address.street || null,
        city: address.city || null,
        state: address.state || null,
        zip: address.zip || null,
      },
      estimate: {
        finalPrice: Number(parsed.finalPrice || 0),
        totalVolume: Number(parsed.totalVolume || 0),
        loadLabel: parsed.loadLabel || null,
      },
      items: Array.isArray(parsed.cart) ? parsed.cart : [],
      messages: Array.isArray(messages) ? messages.slice(-20) : [],
      meta: {
        ai: meta.ai || (process.env.OPENAI_API_KEY ? "on" : "off"),
        mode: meta.mode || null,
        userAgent: req.headers["user-agent"] || null,
        referer: req.headers["referer"] || null,
      },
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const ref = await db.collection("leads").add(doc);
    return res.status(200).json({ ok: true, id: ref.id });
  } catch (e) {
    console.error("[/api/lead] error:", e);
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}
