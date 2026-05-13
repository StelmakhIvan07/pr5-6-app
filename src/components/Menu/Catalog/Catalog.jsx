import { useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import { getCategories } from "../../../API/catalog.js";

function Catalog({ isOpen, onClose, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Завантажити категорії з сервера один раз при монтуванні
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Закривати при натисканні Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Блокувати скролл сторінки коли каталог відкритий
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCategoryClick = (cat) => {
    onSelectCategory(cat);
    onClose();
  };

  return (
    <>
      {/* Затемнення фону */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
      />

      {/* Бокова панель */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Catalog</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close catalog">
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {loading && <p className={styles.statusText}>Loading...</p>}
          {error && <p className={styles.statusText}>Error: {error}</p>}
          {!loading && !error && categories.map((cat) => (
            <button
              key={cat.id}
              className={styles.categoryItem}
              onClick={() => handleCategoryClick(cat)}
            >
              <span className={styles.categoryLabel}>{cat.name}</span>
              <span className={styles.arrow}>›</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Catalog;
