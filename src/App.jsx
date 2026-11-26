import { useState } from "react";
import { products } from "./data/products";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PriceComparison from "./components/PriceComparison";
import BestDeal from "./components/BestDeal";

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
        <div>
          <button onClick={() => setSelectedProduct(null)}>
            Back to products
          </button>
          <PriceComparison product={selectedProduct} />
          <BestDeal product={selectedProduct} />
        </div>
      )}
    </div>
  );
}
