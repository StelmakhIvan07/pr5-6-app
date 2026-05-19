import { useState, useEffect } from "react";
import styles from "./AddToCart.module.css";
import { useCart } from "../../hooks/useCart";

/**
 * Модальне вікно для додавання товару в кошик.
 *
 * Props:
 *  - id          : number  — ID товару
 *  - image       : string  — URL зображення товару
 *  - title       : string  — назва товару
 *  - description : string  — опис товару (приходить з сервера)
 *  - price       : string  — ціна (вже форматована, напр. "120 грн")
 *  - numericPrice: number  — числова ціна для розрахунків
 *  - visible     : bool    — чи відкрите вікно
 *  - onClose     : func    — закрити вікно
 */

export default function AddToCart({ id, image, title, description, price, numericPrice, visible, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Скинути кількість, коли вікно закривається
  useEffect(() => {
    if (!visible) {
      setQuantity(1);
    }
  }, [visible]);

  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const increment = () => setQuantity((prev) => prev + 1);

  /* Закриття при кліку на overlay (поза модалкою) */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /* Додати в кошик і закрити */
  const handleConfirm = () => {
    addToCart({
      id,
      image,
      title,
      description,
      price: numericPrice,
      quantity,
    });
    onClose();
  };

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        {/* Зображення */}
        <div className={styles.imageWrapper}>
          {image ? (
            <img src={image} alt={title} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>

        {/* Назва */}
        <h3 className={styles.title}>{title || "Product"}</h3>

        {/* Опис */}
        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Кількість (+/−) */}
        <div className={styles.quantityRow}>
          <button className={styles.qtyBtn} onClick={decrement} aria-label="Зменшити кількість">
            −
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button className={styles.qtyBtn} onClick={increment} aria-label="Збільшити кількість">
            +
          </button>
        </div>

        {/* Ціна + підтвердження */}
        <div className={styles.footer}>
          <span className={styles.price}>
            {numericPrice ? (numericPrice * quantity) + " ₴" : price || "₴---"}
          </span>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}