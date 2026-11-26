import './ProductCard.css';

function getLowestPrice(stores) {
  if (!Array.isArray(stores) || stores.length === 0) {
    return null;
  }

  let lowest = null;
  for (const store of stores) {
    if (store && store.price !== null && store.price !== undefined && store.price !== '') {
      const numericPrice = Number(store.price);
      if (Number.isFinite(numericPrice) && (lowest === null || numericPrice < lowest)) {
        lowest = numericPrice;
      }
    }
  }

  return lowest;
}

export default function ProductCard({ product, onSelect }) {
  const hasImage = Boolean(product?.image && String(product.image).trim() !== '');
  const lowestPrice = getLowestPrice(product?.stores);

  return (
    <article className="pw-card">
      <div className="pw-card-media">
        {hasImage ? (
          <img
            className="pw-card-image"
            src={product.image}
            alt={product?.name || 'Product'}
          />
        ) : (
          <div className="pw-card-image-placeholder" aria-label="No image available">
            No Image
          </div>
        )}
      </div>

      <div className="pw-card-body">
        {product?.category && (
          <span className="pw-card-category">{product.category}</span>
        )}

        <h3 className="pw-card-title">{product?.name}</h3>

        <div className="pw-card-price-box">
          <span className="pw-card-price-label">Lowest Price</span>
          <span className="pw-card-price-value">
            {lowestPrice !== null ? `₹${lowestPrice.toLocaleString('en-IN')}` : 'N/A'}
          </span>
        </div>

        <button
          type="button"
          className="pw-card-button"
          onClick={() => onSelect?.(product)}
        >
          Compare Prices
        </button>
      </div>
    </article>
  );
}
