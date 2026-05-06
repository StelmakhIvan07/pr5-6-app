import "react";
import styles from "./Card.module.css";

function Card({ image, title, price }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {image
                    ? <img src={image} alt={title} className={styles.cardImage} />
                    : <div className={styles.imagePlaceholder} />
                }
            </div>
            <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{title || "Product Name"}</h3>
                <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>{price || "$299"}</span>
                    <button className={styles.addBtn} aria-label="Add to cart">+</button>
                </div>
            </div>
        </div>
    );
}

export default Card;