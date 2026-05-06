// import { useState } from 'react'
import './App.css'
import Header from "./components/Header/Header";
import Card from "./components/Menu/ProductCard/Card";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Card />
      </main>
      <Footer />
    </div>
  );
}

export default App;