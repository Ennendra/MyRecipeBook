import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const Header = () => {
  const navigate = useNavigate();

  const homeNavigation = () => {
    const currentPath = window.location.pathname;
    if (currentPath === '/home') {
      window.location.reload(false);
    }
    else {
      navigate('/home')
    }
  };

  return (
    <header className="header">
      <Button className="header-title"  onClick={homeNavigation} variant="text" color='success'>
        <h1>MyRecipeBook</h1>
        </Button>
      <Stack direction="row" spacing={2}>
        <Button onClick={homeNavigation} startIcon={<HomeOutlinedIcon />} variant='contained' color='success'>Home</Button>
        <Button onClick={() => navigate('/addNewRecipe')} startIcon={<AddOutlinedIcon />} variant='contained' color='success'>Add recipe</Button>
        <Button onClick={() => navigate('/about')} startIcon={<InfoOutlinedIcon />} variant='contained' color='success'>About</Button>
        <Button onClick={() => navigate('/settings')} startIcon={<SettingsOutlinedIcon />} variant='contained' color='success'>Settings</Button>
      </Stack>
      {/* <nav className="nav">
        <button className="nav-button" onClick={() => navigate('/home')}>
          Home
        </button>
        <button className="nav-button" onClick={() => navigate('/addNewRecipe')}>
          + Add recipe
        </button>
        <button className="nav-button" onClick={() => navigate('/about')}>
          About
        </button>
        <button className="nav-button" onClick={() => navigate('/settings')}>
          Settings
        </button>
      </nav> */}
    </header>
  );
};
