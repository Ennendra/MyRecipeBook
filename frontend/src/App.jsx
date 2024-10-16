import { default as React } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { About } from './components/pages/About';
import { Home } from './components/pages/Home';
import { RecipeEditor } from './components/pages/RecipeEditor';
import { Settings } from './components/pages/Settings';
import { ViewRecipe } from './components/pages/ViewRecipe';
// import Divider from '@mui/material/Divider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Redirect from "/" to "/home" */}
      <Route index element={<Navigate to="/home" />} />
      <Route path="home/:searchPattern?" element={<Home />} />
      <Route path="addNewRecipe" element={<RecipeEditor />} />
      <Route path="about" element={<About />} />
      <Route path="settings" element={<Settings />} />
      <Route path="viewRecipe/:id" element={<ViewRecipe />} />
    </Route>
  )
);

function Layout() {
  return (
    <>
      <Header />
      {/* <hr className="separator" /> */}
      {/* The <Outlet> is where the nested route elements are rendered */}
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
