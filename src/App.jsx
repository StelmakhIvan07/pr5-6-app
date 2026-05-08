import { useState } from 'react'
import style from './App.module.css';
import BgImage from './assets/images/font_for_registration.png';
import Header from "./components/Header/Header";
import Card from "./components/Menu/ProductCard/Card";
import Footer from "./components/Footer/Footer";
import RegForm from "./Pages/Registration/RegForm";
function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className={style.app} style={{ backgroundImage: `url(${BgImage})` }}>
      <Header onAuthClick={() => setIsAuthOpen(true)} />
      <main style={{ flex: 1 }}>
        {isAuthOpen ? (
          <RegForm onClose={() => setIsAuthOpen(false)} />
        ) : (
          <Card />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;