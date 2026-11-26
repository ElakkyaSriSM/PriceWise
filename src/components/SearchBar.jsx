import './SearchBar.css';

export default function SearchBar({ searchText = '', setSearchText }) {
  const value = searchText ?? '';

  return (
    <div className="pw-searchbar">
      <div className="pw-searchbar-box">
        <span className="pw-searchbar-icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          type="text"
          className="pw-searchbar-input"
          value={value}
          onChange={(e) => setSearchText?.(e.target.value)}
          placeholder="Search for phones, laptops, headphones..."
          aria-label="Search products"
        />

        {value.length > 0 && (
          <button
            type="button"
            className="pw-searchbar-clear"
            onClick={() => setSearchText?.('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
