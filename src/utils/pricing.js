// File: src/utils/pricing.js

export const fullLoadPoints = 450; export const pricePerPoint = 2.22; export const minimumPrice = 100; export const quarterLoadThreshold = fullLoadPoints * 0.25; // 112.5 export const quarterLoadPrice = 250;

export function calculatePrice(cart) { const totalVolume = cart.reduce((sum, item) => sum + item.volume, 0); const totalItemPrice = cart.reduce((sum, item) => sum + item.price, 0); const highestItemPrice = cart.reduce((max, item) => Math.max(max, item.price), 0);

// Single high-value item exception if (cart.length === 1 && highestItemPrice > quarterLoadPrice) { return { finalPrice: highestItemPrice, totalVolume }; }

if (totalVolume === 0) return { finalPrice: 0, totalVolume };

if (totalVolume < quarterLoadThreshold) { const volumePrice = totalVolume * pricePerPoint;

if (volumePrice > quarterLoadPrice) {
  return { finalPrice: volumePrice, totalVolume };
}

return {
  finalPrice: Math.min(
    Math.max(minimumPrice, totalItemPrice),
    quarterLoadPrice
  ),
  totalVolume
};

}

// Volume-based pricing with rounding-down discount if within 10 pts const fullLoads = Math.floor(totalVolume / fullLoadPoints); const remainder = totalVolume % fullLoadPoints; let remainderCost = remainder * pricePerPoint;

const tiers = [ { label: '1/4', point: quarterLoadThreshold, price: 250 }, { label: '1/2', point: fullLoadPoints * 0.5, price: 500 }, { label: '3/4', point: fullLoadPoints * 0.75, price: 750 }, { label: 'Full', point: fullLoadPoints, price: 1000 } ];

for (const tier of tiers) { const tierAbsolute = fullLoads * fullLoadPoints + tier.point; if (totalVolume > tier.point && totalVolume <= tierAbsolute + 10) { return { finalPrice: fullLoads * 1000 + tier.price, totalVolume }; } }

return { finalPrice: fullLoads * 1000 + remainderCost, totalVolume }; }

export function getLoadLabel(volume) { if (volume === 0) return 'Empty'; const loadNum = Math.floor(volume / fullLoadPoints) + 1; const segment = volume % fullLoadPoints; if (segment === 0) return Load ${loadNum}; if (segment <= quarterLoadThreshold) return Load ${loadNum} - 1/4; if (segment <= fullLoadPoints * 0.5) return Load ${loadNum} - 1/2; if (segment <= fullLoadPoints * 0.75) return Load ${loadNum} - 3/4; return Load ${loadNum} - Full; }

