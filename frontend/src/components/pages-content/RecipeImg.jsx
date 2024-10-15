import React from "react";
import './RecipeCards.css';

function RecipeImg(props) {
    return <div className="imageContainer">
        <img
            src={props.src}
            alt={props.alt}
            className="recipe-image"
        />
    </div>
}
export default RecipeImg;