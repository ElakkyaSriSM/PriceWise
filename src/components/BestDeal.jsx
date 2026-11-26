import {
  getBestDeal,
  getFastestDelivery,
  calculateFinalPrice,
} from "../utils/dealUtils";
import "./BestDeal.css";

function formatINR(amount) {
  return `₹${Number(amount ?? 0).toLocaleString("en-IN")}`;
}

function formatDeliveryCharge(charge) {
  return charge === 0 ? "Free (₹0)" : formatINR(charge);
}

function formatDeliveryDays(days) {
  return days === 1 ? "1 day" : `${days} days`;
}

export default function BestDeal({ product }) {
  const stores = Array.isArray(product?.stores) ? product.stores : [];
  const bestDeal = getBestDeal(stores);
  const fastestDelivery = getFastestDelivery(stores);

  if (!product || !bestDeal || !fastestDelivery) {
    return (
      <section className="best-deal-section" aria-label="Best Deal">
        <p className="best-deal-empty">
          No store pricing data available to compare.
        </p>
      </section>
    );
  }

  const tiedLowestCount = stores.filter(
    (item) => calculateFinalPrice(item) === bestDeal.finalPrice
  ).length;

  const reason =
    tiedLowestCount > 1
      ? `Lowest total price including delivery, with faster ${bestDeal.deliveryDays}-day shipping.`
      : "Lowest total price including delivery.";

  return (
    <section className="best-deal-section" aria-labelledby="best-deal-heading">
      <div className="best-deal-header">
        <h2 id="best-deal-heading" className="best-deal-title">
          Price &amp; Delivery Breakdown
        </h2>
        {product.name && (
          <p className="best-deal-product-name">{product.name}</p>
        )}
      </div>

      <div className="recommendations-grid">
        <div className="best-deal-highlight" role="region" aria-label="Best Deal">
          <span className="best-deal-badge">Best Deal</span>
          <div className="best-deal-summary">
            <div className="best-deal-store-row">
              <span className="best-deal-store-name">{bestDeal.store}</span>
              <span className="best-deal-final-price">
                {formatINR(bestDeal.finalPrice)}
              </span>
            </div>
            <p className="best-deal-reason">{reason}</p>
          </div>
        </div>

        <div
          className="fastest-delivery-highlight"
          role="region"
          aria-labelledby="fastest-delivery-heading"
        >
          <span id="fastest-delivery-heading" className="fastest-delivery-badge">
            Fastest Delivery
          </span>
          <div className="fastest-delivery-summary">
            <div className="best-deal-store-row">
              <span className="best-deal-store-name">
                {fastestDelivery.store}
              </span>
              <span className="fastest-delivery-time">
                {formatDeliveryDays(fastestDelivery.deliveryDays)}
              </span>
            </div>
            <dl className="fastest-delivery-details">
              <div className="fastest-delivery-detail">
                <dt>Product Price</dt>
                <dd>{formatINR(fastestDelivery.price)}</dd>
              </div>
              <div className="fastest-delivery-detail">
                <dt>Delivery Charge</dt>
                <dd>{formatDeliveryCharge(fastestDelivery.deliveryCharge)}</dd>
              </div>
              <div className="fastest-delivery-detail fastest-delivery-detail--total">
                <dt>Final Payable</dt>
                <dd>{formatINR(fastestDelivery.finalPrice)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="best-deal-table-wrapper">
        <table className="best-deal-table">
          <thead>
            <tr>
              <th scope="col">Store</th>
              <th scope="col" className="num">Price</th>
              <th scope="col" className="num">Delivery Charge</th>
              <th scope="col" className="num">Delivery Time</th>
              <th scope="col" className="num">Final Payable</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((item, index) => {
              const finalAmount = calculateFinalPrice(item);
              const isBest =
                item.store === bestDeal.store &&
                finalAmount === bestDeal.finalPrice &&
                item.deliveryDays === bestDeal.deliveryDays;

              return (
                <tr
                  key={item.store || index}
                  className={isBest ? "best-deal-row best-deal-row--best" : "best-deal-row"}
                >
                  <td className="store-cell">
                    <span>{item.store}</span>
                    {isBest && (
                      <span className="best-deal-row-tag">Recommended</span>
                    )}
                  </td>
                  <td className="num">{formatINR(item.price)}</td>
                  <td className="num">
                    {formatDeliveryCharge(item.deliveryCharge)}
                  </td>
                  <td className="num">{formatDeliveryDays(item.deliveryDays)}</td>
                  <td className="num final-cell">{formatINR(finalAmount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
