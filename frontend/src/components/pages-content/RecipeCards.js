import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCards.css';
import RecipeImg from './RecipeImg';
import RecipeInfo from './RecipeInfo';
import { Button } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

const serverPath = 'http://localhost:5000/';

// Function convert minutes into hours + minutes format.
// function convertMinutesToHours(minutes) {
//   let result = [];
//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = minutes % 60;

//   if (hours > 0) {
//     result.push(
//       <>
//         <span className="bold" key="hours">
//           {hours}
//         </span>
//         {' h '}
//       </>
//     );
//   }

//   // Add minutes, if it is not equal 0 or hours = 0
//   if (remainingMinutes > 0 || hours === 0) {
//     result.push(
//       <>
//         <span className="bold" key="minutes">
//           {remainingMinutes}
//         </span>
//         {' min'}
//       </>
//     );
//   }

//   return result;
// }

export const RecipeCards = ({ recipes }) => {
  const navigate = useNavigate();
  
  return (
    <div className="recipe-cards">
      {recipes.map((recipe, i) => (
        <div key={i} className="recipe-card" onClick={() => navigate(`/viewRecipe/${recipe._id}`)}>
          <RecipeImg
            src={(recipe.imageSrc === '') ? `${serverPath}uploads/images/noImageIcon.png` : `${serverPath}${recipe.imageSrc}`}
            onError={(e)=>{e.target.onError = null; e.target.src = `${serverPath}uploads/images/noImageIcon.png`}}
            alt={recipe.recipeName}
          />
          <RecipeInfo
            title={recipe.recipeName}
            totalTime={recipe.prepDurationMinutes + recipe.cookDurationMinutes}
            serves={recipe.recipeServings}
          />
          <Button
            // size="small"
            endIcon={<ArrowRightAltOutlinedIcon />}
            sx={{ justifyContent: 'flex-start', marginLeft: '16px', marginBottom: '10px', fontSize: '12px' }}
            color="success"
          >
            Read more
          </Button>
        </div>
      ))}
    </div>
  );
};
