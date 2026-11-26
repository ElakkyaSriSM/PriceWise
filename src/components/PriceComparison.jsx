import './PriceComparison.css';

function formatRupees(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

function calculateDiscountPercent(originalPrice, price) {
  if (!originalPrice || originalPrice <= price) {
    return 0;
  }
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export default function PriceComparison({ product }) {
  if (!product || !Array.isArray(product.stores) || product.stores.length === 0) {
    return (
      <div className="price-comparison price-comparison--empty">
        <p className="price-comparison__empty-text">No store prices available to compare.</p>
      </div>
    );
  }

  const lowestPrice = Math.min(...product.stores.map((item) => item.price));

  return (
    <section className="price-comparison" aria-label={`Price comparison for ${product.name}`}>
      <div className="price-comparison__header">
        <h3 className="price-comparison__title">Store Price Comparison</h3>
        {product.name && <span className="price-comparison__product">{product.name}</span>}
      </div>

      <div className="price-comparison__table-wrapper">
        <table className="price-comparison__table">
          <thead>
            <tr>
              <th scope="col">Store</th>
              <th scope="col">Original Price</th>
              <th scope="col">Selling Price</th>
              <th scope="col">Discount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {product.stores.map((item) => {
              const discountPercent = calculateDiscountPercent(item.originalPrice, item.price);
              const isLowest = item.price === lowestPrice;

              return (
                <tr
                  key={item.store}
                  className={isLowest ? 'price-comparison__row price-comparison__row--lowest' : 'price-comparison__row'}
                >
                  <td className="price-comparison__store">{item.store}</td>
                  <td className="price-comparison__original">
                    {formatRupees(item.originalPrice)}
                  </td>
                  <td className="price-comparison__selling">
                    {formatRupees(item.price)}
                  </td>
                  <td className="price-comparison__discount">
                    <span className="price-comparison__discount-badge">
                      {discountPercent}% off
                    </span>
                  </td>
                  <td className="price-comparison__status">
                    {isLowest ? (
                      <span className="price-comparison__lowest-badge">Lowest Price</span>
                    ) : (
                      <span className="price-comparison__muted">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
