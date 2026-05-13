import { useState, useEffect } from 'react'
import style from './App.module.css';
import BgImage from './assets/images/font_for_registration.png';
import Header from "./components/Header/Header";
import Card from "./components/Menu/ProductCard/Card";
import ProductGrid from "./components/Menu/ProductGrid/ProductGrid";
import Footer from "./components/Footer/Footer";
import RegForm from "./Pages/Registration/RegForm";
import { getCurrentUser } from './API/authorization.js';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  // null = не авторизований, об'єкт = авторизований юзер
  const [user, setUser] = useState(null);
  // Обрана категорія: null = головна, { id, name } = показати товари
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Перевірити сесію при старті додатку
  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

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
    <div className={style.app} style={{ backgroundImage: `url(${BgImage})` }}>
      <Header
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setIsAuthOpen(false);
        }}
      />
      <main style={{ flex: 1 }}>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;