import { useEffect } from "react";
import styles from "./Catalog.module.css";

const categories = [
  { id: 1, icon: "📱", label: "Smartphones and gadgets" },
  { id: 2, icon: "💻", label: "Laptops and computers" },
  { id: 3, icon: "🎧", label: "Headphones and audio" },
  { id: 4, icon: "📷", label: "Photo and video" },
  { id: 5, icon: "🎮", label: "Games and consoles" },
  { id: 6, icon: "👕", label: "Clothing and footwear" },
  { id: 7, icon: "🏠", label: "Home and garden" },
  { id: 8, icon: "🚗", label: "Auto and moto" },
  { id: 9, icon: "⚽", label: "Sport and recreation" },
  { id: 10, icon: "📚", label: "Books and stationery" },
];

function Catalog({ isOpen, onClose }) {
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
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
          {categories.map((cat) => (
            <a key={cat.id} href={`/catalog/${cat.id}`} className={styles.categoryItem}>
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span className={styles.categoryLabel}>{cat.label}</span>
              <span className={styles.arrow}>›</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Catalog;
