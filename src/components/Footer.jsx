import './Footer.css';

export default function Footer() {
  return (
    <footer className="pw-footer">
      <div className="pw-footer-inner">
        <div>
          <div className="pw-footer-brand">
            <span className="pw-footer-logo">PriceWise</span>
          </div>
          <h4 className="pw-footer-heading">About PriceWise</h4>
          <p className="pw-footer-text">
            PriceWise is a smart price comparison platform that helps you compare
            real-time selling prices, discounts, and delivery speed across top
            electronics stores in one clean view.
          </p>
        </div>

        <div>
          <h4 className="pw-footer-heading">Supported Stores</h4>
          <div className="pw-footer-stores" aria-label="Supported stores">
            <span className="pw-footer-store">
              <span className="pw-footer-dot pw-footer-dot--amazon" aria-hidden="true" />
              Amazon
            </span>
            <span className="pw-footer-store">
              <span className="pw-footer-dot pw-footer-dot--flipkart" aria-hidden="true" />
              Flipkart
            </span>
            <span className="pw-footer-store">
              <span className="pw-footer-dot pw-footer-dot--croma" aria-hidden="true" />
              Croma
            </span>
          </div>
        </div>

        <div>
          <h4 className="pw-footer-heading">Contact</h4>
          <ul className="pw-footer-contact">
            <li>
              Email: <a href="mailto:support@pricewise.in">support@pricewise.in</a>
            </li>
            <li>Phone: +91 80 4123 7890</li>
            <li>Bengaluru, India</li>
          </ul>
        </div>
      </div>

      <div className="pw-footer-bottom">
        <span>© {new Date().getFullYear()} PriceWise. All rights reserved.</span>
        <span>Comparing Amazon, Flipkart &amp; Croma</span>
      </div>
    </footer>
  );
}
