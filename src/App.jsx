import { useState } from "react";
import { products } from "./data/products";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PriceComparison from "./components/PriceComparison";
import BestDeal from "./components/BestDeal";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  // State for search query
  const [searchText, setSearchText] = useState("");

  // State for the product currently clicked/selected
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products where name or category contains the search text (case-insensitive)
  const filteredProducts = products.filter((product) => {
    const query = searchText.toLowerCase();
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesCategory = product.category.toLowerCase().includes(query);
    return matchesName || matchesCategory;
  });

  return (
    <div className="app">
      {/* Always display the Navbar */}
      <Navbar />

      {/* If no product is selected, display the Home view */}
      {selectedProduct === null ? (
        <Home
          products={filteredProducts}
          searchText={searchText}
          setSearchText={setSearchText}
          onSelect={setSelectedProduct}
        />
      ) : (
        /* If a product is selected, show back button and product details */
        <main className="pw-compare-page">
          <button
            type="button"
            className="pw-back-button"
            onClick={() => setSelectedProduct(null)}
          >
            <span className="pw-back-arrow" aria-hidden="true">←</span>
            Back to Products
          </button>

          <section className="pw-compare-product-card" aria-label="Selected product">
            {selectedProduct.image && (
              <div className="pw-compare-product-media">
                <img
                  className="pw-compare-product-image"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
              </div>
            )}
            <div className="pw-compare-product-info">
              {selectedProduct.category && (
                <span className="pw-compare-product-category">
                  {selectedProduct.category}
                </span>
              )}
              <h1 className="pw-compare-product-title">{selectedProduct.name}</h1>
              <p className="pw-compare-product-sub">
                Comparing prices, discounts, and delivery across Amazon, Flipkart &amp; Croma
              </p>
            </div>
          </section>

          <PriceComparison product={selectedProduct} />
          <BestDeal product={selectedProduct} />
        </main>
      )}

      {/* Always display the Footer */}
      <Footer />
    </div>
  );
}
