import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';

export const SearchBar = props => {
  const { onSearch, searchPattern } = props;
  const [searchTerm, setSearchTerm] = useState('');

  // Set initial value for searching field.
  useEffect(() => {
    setSearchTerm(searchPattern ?? '');
  }, [searchPattern]);

  const searchRecipes = () => {
    // Passing search pattern to parent component.
    onSearch(searchTerm);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for recipes"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {/* <button onClick={searchRecipes}>Search</button> */}
      <Button onClick={searchRecipes} startIcon={<SearchOutlinedIcon />} variant='contained' color='success'>
        Search
      </Button>
    </div>
  );
};
