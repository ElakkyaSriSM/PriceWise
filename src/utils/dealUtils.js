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
 * Selects a preferred store from `stores` using `isBetter` and attaches `finalPrice`.
 *
 * @param {Array<object>} stores
 * @param {(candidate: object, candidateFinal: number, current: object, currentFinal: number) => boolean} isBetter
 * @returns {object|null}
 */
function selectPreferredStore(stores, isBetter) {
  if (!Array.isArray(stores) || stores.length === 0) {
    return null;
  }

  let selected = stores[0];
  let selectedFinalPrice = calculateFinalPrice(selected);

  for (let i = 1; i < stores.length; i += 1) {
    const candidate = stores[i];
    const candidateFinalPrice = calculateFinalPrice(candidate);

    if (isBetter(candidate, candidateFinalPrice, selected, selectedFinalPrice)) {
      selected = candidate;
      selectedFinalPrice = candidateFinalPrice;
    }
  }

  return {
    ...selected,
    finalPrice: selectedFinalPrice,
  };
}

/**
 * Selects the store with the lowest final price (price + deliveryCharge),
 * breaking ties by fewer deliveryDays, and returns it with `finalPrice` added.
 *
 * @param {Array<{ store: string, price: number, originalPrice?: number, deliveryCharge: number, deliveryDays: number }>} stores
 * @returns {object|null}
 */
export function getBestDeal(stores) {
  return selectPreferredStore(
    stores,
    (candidate, candidateFinal, current, currentFinal) => {
      const candidateDays = candidate.deliveryDays ?? Infinity;
      const currentDays = current.deliveryDays ?? Infinity;

      return (
        candidateFinal < currentFinal ||
        (candidateFinal === currentFinal && candidateDays < currentDays)
      );
    }
  );
}

/**
 * Selects the store with the lowest deliveryDays,
 * breaking ties by lower final payable amount, and returns it with `finalPrice` added.
 *
 * @param {Array<{ store: string, price: number, originalPrice?: number, deliveryCharge: number, deliveryDays: number }>} stores
 * @returns {object|null}
 */
export function getFastestDelivery(stores) {
  return selectPreferredStore(
    stores,
    (candidate, candidateFinal, current, currentFinal) => {
      const candidateDays = candidate.deliveryDays ?? Infinity;
      const currentDays = current.deliveryDays ?? Infinity;

      return (
        candidateDays < currentDays ||
        (candidateDays === currentDays && candidateFinal < currentFinal)
      );
    }
  );
}
