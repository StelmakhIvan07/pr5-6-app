import { useState } from "react";
import styles from "./Header.module.css";
import userIcon from '../../assets/icons/user.png';
import searchIcon from '../../assets/icons/search.png';
import Catalog from "../Menu/Catalog/Catalog";
import homeIcon from '../../assets/icons/home.png';
import cartIcon from '../../assets/icons/cart.png';

function Header({ onAuthClick }) {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

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

          {/* Пошукове меню */}
          <div className={styles.searchContainer}>
            <form className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                <img src={searchIcon} alt="Search" className={styles.searchIcon} />
              </button>
            </form>
          </div>

          {/* Навігація та дії */}
          <div className={styles.navigationContainer}>
            <nav className={styles.navigation}>
              <a href="/" className={styles.navLink}>
                <img src={homeIcon} alt="Home" className={styles.homeIcon} /></a>
              <button 
                className={styles.navLink} 
                onClick={onAuthClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <img src={userIcon} alt="Register" className={styles.userIcon} />
              </button>
              <div className={styles.cart}>
                <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Каталог (sidebar) */}
      <Catalog isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
    </>
  );
}

export default Header;