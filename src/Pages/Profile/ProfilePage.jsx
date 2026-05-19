import { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import { getOrderHistory } from "../../API/orders";

/**
 * Сторінка профілю користувача.
 * Показує нік, email та історію замовлень.
 */
export default function ProfilePage({ user, onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getOrderHistory()
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <h2 className={styles.heading}>Profile</h2>
      </div>

      {/* Інформація про користувача */}
      <div className={styles.userCard}>
        <div className={styles.avatar}>👤</div>
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{user.userName}</h3>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      </div>

      {/* Історія замовлень */}
      <h3 className={styles.sectionTitle}>Order history</h3>

      {loading && <p className={styles.status}>Loading...</p>}
      {error && <p className={styles.status}>Error: {error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className={styles.status}>No orders yet</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className={styles.orderList}>
          {orders.map((order, index) => (
            <div className={styles.orderCard} key={order.id || index}>
              <div className={styles.orderHeader}>
                <span className={styles.orderId}>
                  Замовлення #{order.id ? String(order.id).slice(0, 8) : index + 1}
                </span>
                {order.createdAt && (
                  <span className={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
                {order.status && (
                  <span className={styles.orderStatus}>{order.status}</span>
                )}
              </div>

              {/* Товари в замовленні */}
              {order.items && order.items.length > 0 && (
                <div className={styles.orderItems}>
                  {order.items.map((item, i) => (
                    <div className={styles.orderItem} key={i}>
                      <span className={styles.itemName}>
                        {item.productName || item.title || `Товар ${i + 1}`}
                      </span>
                      <span className={styles.itemQty}>×{item.quantity}</span>
                      {item.price != null && (
                        <span className={styles.itemPrice}>
                          {item.price * item.quantity} грн
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {order.totalPrice != null && (
                <div className={styles.orderTotal}>
                  Together: <strong>{order.totalPrice} ₴</strong>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
