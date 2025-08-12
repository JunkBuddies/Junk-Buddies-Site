// app/selection/page.jsx
'use client';
import { useState } from 'react';

const SMART_SELECTOR_URL = 'https://smartselector-nbclj4qvoq-uc.a.run.app'; // keep yours

export default function SmartSelector() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]); // {sender: 'user'|'bot', text: string}[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Optional: comment this whole block out if you don't want to send lead info at all
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSaved, setLeadSaved] = useState(false);

  async function callAI(userText) {
    setLoading(true);
    setError(null);

    const messages = [
      ...chat.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
      { role: 'user', content: userText }
    ];

    try {
      const res = await fetch(SMART_SELECTOR_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          leadInfo: leadSaved
            ? { name: leadName || '', phone: leadPhone || '', submitted: true }
            : { submitted: false }
        })
      });

      // Show raw non-200 details
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} ${res.statusText} — ${txt || 'No body'}`);
      }

      const data = await res.json().catch(() => ({}));
      console.log('AI raw response:', data);

      const replyText =
        typeof data?.reply === 'string'
          ? data.reply
          : typeof data?.message === 'string'
          ? data.message
          : JSON.stringify(data); // show *something* so we can see the shape

      setChat(prev => [
        ...prev,
        { sender: 'user', text: userText },
        { sender: 'bot', text: replyText || '(empty reply)' }
      ]);
    } catch (e) {
      console.error('AI error:', e);
      setError(e.message || 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  }

  const handleSend = async () => {
    const text
