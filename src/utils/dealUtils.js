export function calculateBestDeal(product) {
  if (!product || !product.stores || product.stores.length === 0) {
    return null;
  }
  return product.stores.reduce((best, store) => {
    const total = store.price + store.deliveryCharge;
    const currentBestTotal = best.price + best.deliveryCharge;
    return total < currentBestTotal ? store : best;
  }, product.stores[0]);
}
