import './Navbar.css';

export default function Navbar() {
  return (
    <header className="pw-navbar">
      <div className="pw-navbar-inner">
        <div className="pw-navbar-brand">
          <div className="pw-navbar-icon" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          </div>
          <div className="pw-navbar-text">
            <span className="pw-navbar-logo">PriceWise</span>
            <p className="pw-navbar-tagline">
              Smart price comparisons across Amazon, Flipkart &amp; Croma
            </p>
          </div>
        </div>

        <div className="pw-navbar-stores" aria-label="Supported stores">
          <span className="pw-store-pill pw-store-pill--amazon">Amazon</span>
          <span className="pw-store-pill pw-store-pill--flipkart">Flipkart</span>
          <span className="pw-store-pill pw-store-pill--croma">Croma</span>
        </div>
      </div>
    </header>
  );
}
