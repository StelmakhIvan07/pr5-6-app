import { useState, useEffect, useRef } from 'react';
import styles from './UserMenu.module.css';
import userIcon from '../../assets/icons/user.png';
import { logoutUser } from '../../API/authorization.js';

function UserMenu({ user, onLogout, onProfileClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Закрити dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // ігноруємо помилку logout
    } finally {
      onLogout();
      setIsOpen(false);
    }
  };

  const handleProfile = () => {
    setIsOpen(false);
    if (onProfileClick) onProfileClick();
  };

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button
        className={styles.iconBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="User menu"
      >
        <img src={userIcon} alt="User" className={styles.userIcon} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <p className={styles.username}>👤 {user.userName}</p>
          <hr className={styles.divider} />
          <button className={styles.profileBtn} onClick={handleProfile}>
            Profile
          </button>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
