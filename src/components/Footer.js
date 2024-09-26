import React from 'react';
import './Styles.css';

export const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MyRecipeBook </p>
      </footer>
    </div>
  );
};
