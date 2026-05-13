import { useState, useEffect } from "react";
import styles from "./ProductGrid.module.css";
import Card from "../ProductCard/Card";
import { getProductsByCategory } from "../../../API/catalog.js";

function ProductGrid({ category, onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductsByCategory(category.id)
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category.id]);

  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <h2 className={styles.heading}>{category.name}</h2>
      </div>

      {loading && <p className={styles.status}>Loading products...</p>}
      {error && <p className={styles.status}>Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className={styles.status}>No products found in this category.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className={styles.grid}>
          {products.map((product) => (
            <Card
              key={product.id}
              image={product.imageUrl}
              title={product.productName}
              price={`$${product.productPrice}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
