import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import './Home.css';

export default function Home({ products, searchText, setSearchText, onSelect }) {
  const productList = Array.isArray(products) ? products : [];

  return (
    <main className="pw-home">
      <section className="pw-home-hero">
        <h1 className="pw-home-heading">Welcome to PriceWise</h1>
        <p className="pw-home-subtitle">
          Discover the best deals by comparing prices across Amazon, Flipkart, and Croma.
        </p>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </section>

      {productList.length === 0 ? (
        <div className="pw-home-empty">
          <p>No products found</p>
        </div>
      ) : (
        <section className="pw-home-grid" aria-label="Product list">
          {productList.map((product, index) => (
            <ProductCard
              key={product?.id ?? `${product?.name ?? 'product'}-${index}`}
              product={product}
              onSelect={onSelect}
            />
          ))}
        </section>
      )}
    </main>
  );
}
