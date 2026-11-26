/**
 * Calculates the final payable amount for a store listing.
 *
 * @param {{ price?: number, deliveryCharge?: number }} storeItem
 * @returns {number}
 */
export function calculateFinalPrice(storeItem) {
  if (!storeItem) {
    return 0;
  }
  return (storeItem.price ?? 0) + (storeItem.deliveryCharge ?? 0);
}

/**
 * Selects the store with the lowest final price (price + deliveryCharge),
 * breaking ties by fewer deliveryDays, and returns it with `finalPrice` added.
 *
 * @param {Array<{ store: string, price: number, originalPrice?: number, deliveryCharge: number, deliveryDays: number }>} stores
 * @returns {object|null}
 */
export function getBestDeal(stores) {
  if (!Array.isArray(stores) || stores.length === 0) {
    return null;
  }

  let bestStore = stores[0];
  let bestFinalPrice = calculateFinalPrice(bestStore);

  for (let i = 1; i < stores.length; i += 1) {
    const candidate = stores[i];
    const candidateFinalPrice = calculateFinalPrice(candidate);
    const candidateDays = candidate.deliveryDays ?? Infinity;
    const bestDays = bestStore.deliveryDays ?? Infinity;

    if (
      candidateFinalPrice < bestFinalPrice ||
      (candidateFinalPrice === bestFinalPrice && candidateDays < bestDays)
    ) {
      bestStore = candidate;
      bestFinalPrice = candidateFinalPrice;
    }
  }

  return {
    ...bestStore,
    finalPrice: bestFinalPrice,
  };
}
