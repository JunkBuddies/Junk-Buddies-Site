// File: src/utils/pricing.js

export const fullLoadPoints = 550;
export const pricePerPoint = 1.82;
export const minimumPrice = 100;
export const quarterLoadThreshold = fullLoadPoints * 0.25; // 137.5
export const quarterLoadPrice = 250;

export function calculatePrice(cart) {
  const totalVolume = cart.reduce((sum, item) => sum + item.volume, 0);
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const highestItemPrice = cart.reduce((max, item) => Math.max(max, item.price), 0);

  const volumePrice = totalVolume * pricePerPoint;

  // ✅ 1) Single high-value item rule
  if (cart.length === 1 && highestItemPrice > quarterLoadPrice) {
    return { finalPrice: highestItemPrice, totalVolume };
  }

  // ✅ 2) For under 1/4 load: 
  if (totalVolume < quarterLoadThreshold) {
    if (totalItemPrice < quarterLoadPrice && volumePrice < quarterLoadPrice) {
      // both below: use max(minimum, item price)
      return {
        finalPrice: Math.max(minimumPrice, totalItemPrice),
        totalVolume
      };
    } else {
      // either crosses: switch fully to cubic price
      return {
        finalPrice: volumePrice,
        totalVolume
      };
    }
  }

  // ✅ 3) For 1/4 and up:
  const fullLoads = Math.floor(totalVolume / fullLoadPoints);
  const remainder = totalVolume % fullLoadPoints;
  const remainderCost = remainder * pricePerPoint;

  // Only first truck gets tier rounding
  if (fullLoads === 0) {
    const tiers = [
      { point: quarterLoadThreshold, price: 250 },
      { point: fullLoadPoints * 0.5, price: 500 },
      { point: fullLoadPoints * 0.75, price: 750 },
      { point: fullLoadPoints, price: 1000 }
    ];
    for (const tier of tiers) {
      if (totalVolume > tier.point && totalVolume <= tier.point + 10) {
        return {
          finalPrice: tier.price,
          totalVolume
        };
      }
    }
  }

  // ✅ Multiple trucks: pure cubic price, no tier rounding
  return {
    finalPrice: fullLoads * 1000 + remainderCost,
    totalVolume
  };
}

export function getLoadLabel(volume) {
  if (volume === 0) return 'Empty';
  const loadNum = Math.floor(volume / fullLoadPoints) + 1;
  const segment = volume % fullLoadPoints;
  if (segment === 0) return `Load ${loadNum}`;
  if (segment <= fullLoadPoints * 0.25) return `Load ${loadNum} - 1/4`;
  if (segment <= fullLoadPoints * 0.5) return `Load ${loadNum} - 1/2`;
  if (segment <= fullLoadPoints * 0.75) return `Load ${loadNum} - 3/4`;
  return `Load ${loadNum} - Full`;
}
