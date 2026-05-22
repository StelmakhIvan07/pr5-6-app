import { useState } from "react";
import styles from "./Header.module.css";
import userIcon from '../../assets/icons/user.png';
import searchIcon from '../../assets/icons/search.png';
import Catalog from "../Menu/Catalog/Catalog";
import homeIcon from '../../assets/icons/home.png';
import cartIcon from '../../assets/icons/cart.png';
import UserMenu from "./UserMenu";
import { useCart } from "../../hooks/useCart";

function Header({ user, onAuthClick, onLogout, onSelectCategory, onCartClick, onProfileClick }) {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Кнопка-бургер */}
          <button
            className={styles.burgerBtn}
            onClick={() => setIsCatalogOpen(true)}
            aria-label="Відкрити каталог"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>

          {/* Логотип */}
          <div className={styles.logo}>
            <a href="/">Store</a>
          </div>

          {/* Навігація та дії */}
          <div className={styles.navigationContainer}>
            <nav className={styles.navigation}>
              <a href="/" className={styles.navLink}>
                <img src={homeIcon} alt="Home" className={styles.homeIcon} /></a>

              {/* Якщо юзер авторизований — показати dropdown, інакше — кнопку входу */}
              {user ? (
                <UserMenu user={user} onLogout={onLogout} onProfileClick={onProfileClick} />
              ) : (
                <button
                  className={styles.navLink}
                  onClick={onAuthClick}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <img src={userIcon} alt="Login" className={styles.userIcon} />
                </button>
              )}

              <button
                className={styles.cartBtn}
                onClick={onCartClick}
                aria-label="Відкрити кошик"
              >
                <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>{totalItems}</span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Каталог (sidebar) */}
      <Catalog
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectCategory={onSelectCategory}
      />
    </>
  );
}

export default Header;