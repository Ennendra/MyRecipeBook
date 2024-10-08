import React from 'react';
import './Styles.css';

//temporary setup of localstorage preferences
const tempSettings = {
  'preferenceGrams': 'oz',
  'preferenceOunces': 'oz',
  'preferenceCups': 'cup',
  'preferenceTeaspoons': 'oz',
  'preferenceTablespoons': 'oz'
};
localStorage.setItem('ingredientPreference', JSON.stringify(tempSettings));

export const Settings = () => {
  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="textStyle"> Chose...</p>
    </div>
  );
};
