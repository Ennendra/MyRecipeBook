import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { About } from './components/pages/About';
import { AddNewRecipe } from './components/pages/AddNewRecipe';
import { Home } from './components/pages/Home';
import { Settings } from './components/pages/Settings';
import { ViewRecipe } from './components/pages/ViewRecipe';

function App() {
  return (
    <>
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
          <Route path="/viewRecipe/:id" element={<ViewRecipe />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
