import { useState } from "react";
import styles from "./CartPage.module.css";
import { useCart } from "../../hooks/useCart";
import { createOrder } from "../../API/orders";

/**
 * Сторінка корзини.
 * Показує список товарів, доданих у кошик.
 */
export default function CartPage({ onBack }) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderStatus, setOrderStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [orderError, setOrderError] = useState(null);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCreateOrder = async () => {
    setOrderStatus("loading");
    setOrderError(null);
    try {
      await createOrder(cart);
      setOrderStatus("success");
      clearCart();
    } catch (err) {
      setOrderStatus("error");
      setOrderError(err.message);
    }
  };

  if (cart.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onBack}>
            ← Back
          </button>
          <h2 className={styles.heading}>Cart</h2>
        </div>
        {orderStatus === "success" ? (
          <p className={styles.successMessage}>✅ Order successfully created!</p>
        ) : (
          <p className={styles.emptyMessage}>Cart is empty</p>
        )}
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <h2 className={styles.heading}>Cart</h2>
        <button className={styles.clearBtn} onClick={clearCart}>
          🗑 Remove all
        </button>
      </div>

      <div className={styles.list}>
        {cart.map((item) => (
          <div className={styles.card} key={item.id}>
            {/* Зображення */}
            <div className={styles.imageWrapper}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.cardImage}
                />
              ) : (
                <div className={styles.imagePlaceholder} />
              )}
            </div>

            {/* Інфо */}
            <div className={styles.info}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.description && (
                <p className={styles.description}>{item.description}</p>
              )}

              <div className={styles.actions}>
                {/* Кількість */}
                <div className={styles.quantityRow}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Зменшити кількість"
                  >
                    −
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Збільшити кількість"
                  >
                    +
                  </button>
                </div>

                {/* Видалити */}
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>

            {/* Ціна */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>
                {item.price * item.quantity} грн
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Підсумок */}
      <div className={styles.total}>
        <span>Total:</span>
        <span className={styles.totalPrice}>{totalPrice} ₴</span>
      </div>

      {/* Помилка */}
      {orderStatus === "error" && (
        <p className={styles.errorMessage}>❌ {orderError}</p>
      )}

      {/* Кнопка замовлення */}
      <button
        className={styles.orderBtn}
        onClick={handleCreateOrder}
        disabled={orderStatus === "loading"}
      >
        {orderStatus === "loading" ? "Creating..." : "Create order"}
      </button>
    </section>
  );
}
