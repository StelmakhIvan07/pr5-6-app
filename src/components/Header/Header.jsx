import "react";
import styles from "./Header.module.css";
import userIcon from '../../assets/icons/user.png';
import searchIcon from '../../assets/icons/search.png';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <a href="/">Store</a>
        </div>

        {/* Пошукове меню */}
        <div className={styles.searchContainer}>
        <form className={styles.searchForm}>
          <input
            type="text"
            placeholder="Пошук товарів..."
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
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/register" className={styles.navLink}>
            <img src={userIcon} alt="Register" className={styles.userIcon} />
          </a>
          <div className={styles.cart}>
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.cartCount}>0</span>
          </div>
        </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;