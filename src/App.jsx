import { useState, useEffect } from 'react'
import style from './App.module.css';
import BgImage from './assets/images/font_for_registration.png';
import Header from "./components/Header/Header";
import Card from "./components/Menu/ProductCard/Card";
import ProductGrid from "./components/Menu/ProductGrid/ProductGrid";
import Footer from "./components/Footer/Footer";
import RegForm from "./Pages/Registration/RegForm";
import CartPage from "./Pages/Cart/CartPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import { getCurrentUser } from './API/authorization.js';
import { CartProvider } from './hooks/useCart';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  // null = не авторизований, об'єкт = авторизований юзер
  const [user, setUser] = useState(null);
  // Обрана категорія: null = головна, { id, name } = показати товари
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Чи відкрита сторінка кошика
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Чи відкрита сторінка профілю
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Перевірити сесію при старті додатку
  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Скинути всі сторінки крім обраної
  const resetPages = () => {
    setIsAuthOpen(false);
    setIsCartOpen(false);
    setIsProfileOpen(false);
    setSelectedCategory(null);
  };

  // Визначаємо, що показати в main
  const renderContent = () => {
    if (isAuthOpen && !user) {
      return (
        <RegForm
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setIsAuthOpen(false);
          }}
        />
      );
    }

    if (isProfileOpen && user) {
      return (
        <ProfilePage
          user={user}
          onBack={() => setIsProfileOpen(false)}
        />
      );
    }

    if (isCartOpen) {
      if (!user) {
        return (
          <section style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ color: 'rgb(255 255 255 / 60%)', fontSize: 18 }}>
              Щоб переглянути кошик, увійдіть в акаунт.
            </p>
          </section>
        );
      }
      return (
        <CartPage
          onBack={() => setIsCartOpen(false)}
        />
      );
    }

    if (selectedCategory) {
      return (
        <ProductGrid
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      );
    }
  };

  return (
    <CartProvider>
      <div className={style.app} style={{ backgroundImage: `url(${BgImage})` }}>
        <Header
          user={user}
          onAuthClick={() => { resetPages(); setIsAuthOpen(true); }}
          onLogout={() => { resetPages(); setUser(null); }}
          onSelectCategory={(cat) => { resetPages(); setSelectedCategory(cat); }}
          onCartClick={() => { resetPages(); setIsCartOpen(true); }}
          onProfileClick={() => { resetPages(); setIsProfileOpen(true); }}
        />
        <main style={{ flex: 1 }}>
          {renderContent()}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;