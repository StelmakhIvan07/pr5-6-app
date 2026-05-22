import { useState } from "react";
import styles from "./Card.module.css";
import AddToCart from "../../AddToCart/AddToCart";

function Card({ id, image, title, price, numericPrice, description }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddClick = (e) => {
        e.stopPropagation();
        setModalOpen(true);
    };

    return (
        <>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    {image
                        ? <img src={image} alt={title} className={styles.cardImage} />
                        : <div className={styles.imagePlaceholder} />
                    }
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.cardTitleWrapper}>
                        <h3 className={styles.cardTitle}>{title || "Product Name"}</h3>
                    </div>
                    <div className={styles.cardFooter}>
                        <span className={styles.cardPrice}>{price || "₴---"}</span>
                        <button
                            className={styles.addBtn}
                            aria-label="Add to cart"
                            onClick={handleAddClick}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Модальне вікно AddToCart */}
            <AddToCart
                id={id}
                image={image}
                title={title}
                description={description}
                price={price}
                numericPrice={numericPrice}
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}

export default Card;