// import { useState } from 'react'
import './App.css'
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <h1>Welcome to MySite</h1>
        <p>This is the homepage content.</p>
      </main>
    </div>
  );
}

export default App;