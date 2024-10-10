import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { About } from './components/pages/About';
import { Home } from './components/pages/Home';
import { RecipeEditor } from './components/pages/RecipeEditor';
import { Settings } from './components/pages/Settings';
import { ViewRecipe } from './components/pages/ViewRecipe';
// import Divider from '@mui/material/Divider';


function App() {
  return (
    <>
      <Router>
        <Header />
        {/* <Divider /> */}
        {/* <hr className="separator" /> */}
        <Routes>
          {/* Set default path. */}
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/home/:searchPattern?" element={<Home />} />
          <Route path="/addNewRecipe" element={<RecipeEditor />} />
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
