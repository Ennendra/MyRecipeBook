import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <h1 className="header-title">MyRecipeBook</h1>
      <nav className="nav">
        <button className="nav-button" onClick={() => navigate('/home')}>
          Home
        </button>
        <button className="nav-button" onClick={() => navigate('/addNewRecipe')}>
          Add recipe
        </button>
        <button className="nav-button" onClick={() => navigate('/about')}>
          About
        </button>
        <button className="nav-button" onClick={() => navigate('/settings')}>
          Settings
        </button>
      </nav>
    </header>
  );
};
