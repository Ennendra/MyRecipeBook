import React from "react";
import "./App.css";
import { RecipeCards } from "./components/RecipeCards";
import { SearchBar } from "./components/SearchBar";

function App() {
  const recipes = [
    {
      recipeIDNumber: 1,
      recipeName: "Fish soup.",
      resipeImage: "images/fishSoup.jpeg",
      cookDurationMinutes: "1 hour",
      portions: 4,
    },
    {
      recipeIDNumber: 2,
      recipeName: "Pizza Margherita.",
      resipeImage: "images/pizzaMargherita.jpg",
      cookDurationMinutes: "1.5 hours",
      portions: 3,
    },
    {
      recipeIDNumber: 3,
      recipeName: "Pasta Bolognese.",
      resipeImage: "images/pastaBolognese.jpg",
      cookDurationMinutes: "30 minutes",
      portions: 6,
    },
  ];

  return (
    <div className="App">
      {" "}
      {}
      <div>
        <h1 className="h1"> My recipe book</h1>
        <SearchBar />
      </div>
      <h1 className="h1" />
      <RecipeCards recipes={recipes} />
    </div>
  );
}

export default App;
