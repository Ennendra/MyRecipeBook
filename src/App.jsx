import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { About } from './components/About';
import { AddNewRecipe } from './components/AddNewRecipe';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Settings } from './components/Settings';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <hr className="separator" />
        <Routes>
          {/* Set default path. */}
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/addNewRecipe" element={<AddNewRecipe />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
