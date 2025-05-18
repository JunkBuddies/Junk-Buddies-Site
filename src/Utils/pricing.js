// src/utils/pricing.js

export const fullLoadPoints = 450; export const pricePerPoint = 2.22; export const minimumPrice = 100; export const quarterLoadThreshold = fullLoadPoints * 0.25; export const loadTierPrices = { 1: 250, 2: 500, 3: 750, 4: 1000 };

export function getLoadLabel(volume) { if (volume === 0) return 'Empty'; const loadNum = Math.floor(volume / fullLoadPoints) + 1; const segment = volume % fullLoadPoints; if (segment === 0) return Load ${loadNum}; if (segment <= fullLoadPoints * 0.25) return Load ${loadNum} - 1/4; if (segment <= fullLoadPoints * 0.5) return Load ${loadNum} - 1/2; if (segment <= fullLoadPoints * 0.75) return Load ${loadNum} - 3/4; return Load ${loadNum} - Full; }

export function calculateFinalPrice(cart) { const totalVolume = cart.reduce((sum, item) => sum + item.volume, 0); const totalItemPrice = cart.reduce((sum, item) => sum + item.price, 0); const highestItemPrice = cart.reduce((max, item) => Math.max(max, item.price), 0);

if (totalVolume === 0) return 0;

// Handle single expensive item (over 250) if (cart.length === 1 && highestItemPrice > 250) return highestItemPrice;

// Under 1/4 load if (totalVolume < quarterLoadThreshold) { const volumePrice = totalVolume * pricePerPoint; const base = Math.max(totalItemPrice, minimumPrice); if (volumePrice > 250) return volumePrice; return Math.min(base, 250); }

// Full load tiers const fullLoads = Math.floor(totalVolume / fullLoadPoints); const remainder = totalVolume % fullLoadPoints; let tieredPrice = fullLoads * 1000 + remainder * pricePerPoint;

// Check rounding down within 10 points of next quarter const quarterPoints = [0.25, 0.5, 0.75, 1.0].map(p => p * fullLoadPoints); for (let i = 0; i < quarterPoints.length; i++) { const tierPoint = fullLoads * fullLoadPoints + quarterPoints[i]; const tierPrice = loadTierPrices[i + 1] || 1000; if (totalVolume > tierPoint && totalVolume <= tierPoint + 10) { return fullLoads * 1000 + tierPrice; } }

return tieredPrice; }

