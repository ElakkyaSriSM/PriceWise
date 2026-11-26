# PriceWise Team Guide

RULE: Only edit your own files. Never edit another member's files.

## File ownership
- Member 1 (Design): src/components/Navbar.jsx, SearchBar.jsx, ProductCard.jsx, Home.jsx
- Member 2 (Prices): src/data/products.js, src/components/PriceComparison.jsx
- Member 3 (Deals): src/utils/dealUtils.js, src/components/BestDeal.jsx
- Integration owner: src/App.jsx, src/main.jsx

## Data format
Every product in src/data/products.js uses: id, name, category, image, and a stores list. Each store has: store, price, originalPrice, deliveryCharge, deliveryDays.
