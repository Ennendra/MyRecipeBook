//import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import {React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from './context/auth-context';

export const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const homeNavigation = () => {
    navigate(`/`);
  };

  return (
    <header className="header">
      <Button className="header-title" onClick={homeNavigation} variant="text" color="success">
        <h1>MyRecipeBook</h1>
      </Button>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={homeNavigation}
          startIcon={<HomeOutlinedIcon />}
          variant="contained"
          color="success"
        >
          Home
        </Button>
        {/* {auth.isLoggedIn && (
          <Button
          onClick={() => navigate('/addNewRecipe')}
          startIcon={<AddOutlinedIcon />}
          variant="contained"
          color="success"
          >
          Add Recipe
        </Button>
        )} */}
        <Button
          onClick={() => navigate('/about')}
          startIcon={<InfoOutlinedIcon />}
          variant="contained"
          color="success"
        >
          About
        </Button>
        <Button
          onClick={() => navigate('/settings')}
          startIcon={<SettingsOutlinedIcon />}
          variant="contained"
          color="success"
        >
          Settings
        </Button>
        {!auth.isLoggedIn && (
          <Button onClick={() => navigate('/login')}
          startIcon={<SettingsOutlinedIcon />}
          variant="contained"
          color="success">
            Login
          </Button>
        )} 
        {auth.isLoggedIn && (
          <Button onClick={auth.logout}
          startIcon={<SettingsOutlinedIcon />}
          variant="contained"
          color="success">
            Logout
          </Button>
        )}
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
