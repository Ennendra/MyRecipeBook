import { default as React } from 'react';
import {
  //Route, Routes,
  Navigate,
  useParams,
  RouterProvider,
  createBrowserRouter,
  Outlet
} from 'react-router-dom';
import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { About } from './components/pages/About';
import { Home } from './components/pages/Home';
import { RecipeEditor } from './components/pages/RecipeEditor';
import { Settings } from './components/pages/Settings';
import { ViewRecipe } from './components/pages/ViewRecipe';
import { Login } from './components/pages/Login';
import { Signup } from './components/pages/Signup';
import { AuthContext } from './components/common/context/auth-context';
import { useAuthHook } from './hooks/AuthHooks';

function App() {
  const {token, login, logout, userId, loading} = useAuthHook();

  //A check to see if the search parameter in search/:searchPattern? is blank or not.
  //If it is, redirect back to homepage. If not, continue the render
  const SearchCheck = () => {
    const {searchPattern} = useParams();

    if (!searchPattern || searchPattern.trim() === '') {
      return <Navigate to="/" />;
    }
    else {
      return <Home />
    }
  }

  //The overall layout of the site: Outlet is where each route-specific element will be rendered as defined in 'routes' and 'CreateBrowserRouter'
  function Layout() {
    return (
      <>
      <Header />
        <main>
          <Outlet />
        </main>
      <Footer />
      </>
    );
  }


  // Check if loading is still happening, then show a loading screen or placeholder
  if (loading) {
    return <div>Loading...</div>;  // Replace with any loading spinner or placeholder component you prefer
  }

  //Defining the routes the app can take
  //Split between whether or not the user is logged in (e.g. a non-logged-in user cannot add a recipe)
  let routes;
  if (token) {
    routes = [
      {
        path: '/',
        element: <Layout />, // Use Layout for authenticated routes
        children: [
          { path: '', element: <Home /> },
          { path: 'search/:searchPattern?', element: <SearchCheck /> },
          { path: 'addNewRecipe', element: <RecipeEditor /> },
          { path: 'about', element: <About /> },
          { path: 'settings', element: <Settings /> },
          { path: 'viewRecipe/:id', element: <ViewRecipe /> },
        ],
      },
      { path: '*', element: <Navigate to="/" /> }, // Catch-all route for invalid paths
    ];
  } else { //Not logged in
    routes = [
      {
        path: '/',
        element: <Layout />, // Use Layout for unauthenticated routes
        children: [
          { path: '', element: <Home /> },
          { path: 'search/:searchPattern?', element: <SearchCheck /> },
          { path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> },
          { path: 'about', element: <About /> },
          { path: 'settings', element: <Settings /> },
          { path: 'viewRecipe/:id', element: <ViewRecipe /> },
        ],
      },
      { path: '*', element: <Navigate to="/login" /> }, // Catch-all route for invalid paths
    ];
  }

  const router = createBrowserRouter(routes, {
    basename: '/MyRecipeBook',
  });

  return (
  <AuthContext.Provider value={{
    isLoggedIn: !!token, 
    token: token, 
    userId: userId, 
    login: login, 
    logout: logout
    }} 
  >
    {/*<RouterProvider router={router} />*/}
    <RouterProvider router={router}>
      {/* <Header />
        <main>
          <Outlet />
        </main>
      <Footer /> */}
    </RouterProvider>
  </AuthContext.Provider>
  );
}

export default App;
