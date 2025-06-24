export const fullLoadPoints = 550;
export const pricePerPoint = 1.82;
export const minimumPrice = 100;
export const quarterLoadThreshold = fullLoadPoints * 0.25; // 137.5
export const quarterLoadPrice = 250;

export function calculatePrice(cart) {
  const totalVolume = cart.reduce((sum, item) => sum + item.volume, 0);
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const highestItemPrice = cart.reduce((max, item) => Math.max(max, item.price), 0);

  // Single high-value item exception stays the same
  if (cart.length === 1 && highestItemPrice > quarterLoadPrice) {
    return { finalPrice: highestItemPrice, totalVolume };
  }

  // Corrected logic for UNDER 1/4 load
  if (totalVolume < quarterLoadThreshold) {
    const volumePrice = totalVolume * pricePerPoint;

    if (totalItemPrice < quarterLoadPrice) {
      // If total item price is still under 250 → pick min or item price
      return {
        finalPrice: Math.max(minimumPrice, totalItemPrice),
        totalVolume
      };
    } else {
      // If total item price crosses 250 → switch to volume pricing immediately
      return {
        finalPrice: volumePrice,
        totalVolume
      };
    }
  }

  // Above 1/4 load logic:
  // First truck uses tier rounding
  const fullLoads = Math.floor(totalVolume / fullLoadPoints);
  const remainder = totalVolume % fullLoadPoints;
  const remainderCost = remainder * pricePerPoint;

  if (fullLoads === 0) {
    // Tier snap logic for first truck only
    const tiers = [
      { label: '1/4', point: quarterLoadThreshold, price: 250 },
      { label: '1/2', point: fullLoadPoints * 0.5, price: 500 },
      { label: '3/4', point: fullLoadPoints * 0.75, price: 750 },
      { label: 'Full', point: fullLoadPoints, price: 1000 }
    ];

    for (const tier of tiers) {
      if (totalVolume > tier.point && totalVolume <= tier.point + 10) {
        return {
          finalPrice: tier.price,
          totalVolume
        };
      }
    }

    return {
      finalPrice: remainderCost,
      totalVolume
    };
  } else {
    // Multiple trucks: no tier snap, pure volume-based pricing
    return {
      finalPrice: fullLoads * 1000 + remainderCost,
      totalVolume
    };
  }
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
