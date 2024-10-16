import React from "react";
import { Stack, Chip} from "@mui/material";
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

// Function convert minutes into hours + minutes format.
// function convertMinutesToHours(minutes) {
//     let result = [];
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;

//     if (hours > 0) {
//         result.push(
//             <>
//                 <span className="bold" key="hours">
//                     {hours}
//                 </span>
//                 {' h '}
//             </>
//         );
//     }

//     // Add minutes, if it is not equal 0 or hours = 0
//     if (remainingMinutes > 0 || hours === 0) {
//         result.push(
//             <>
//                 <span className="bold" key="minutes">
//                     {remainingMinutes}
//                 </span>
//                 {' min'}
//             </>
//         );
//     }

//     return result;
// }


function ConvertMinutesToHoursAndMinutes(minutes) {
    var result = ``;
    var hours = Math.floor(minutes / 60);
    if (hours > 0) {
        result += `${hours}h `;
    }
    var convertedMinutes = minutes % 60;
    if (convertedMinutes > 0) {
        result += `${convertedMinutes}min`;
    }
    return result;
}

function servesMeasurement(serves) {
    return serves > 1 ? ' portions' : ' portion'
}

function RecipeInfo(props) {
    return (
        <div className="recipe-info">
            <div className="recipe-title"> {props.title} </div>
            <Stack gap={1}>
                <Chip icon={<QueryBuilderOutlinedIcon />}
                    label={<div className="bold">
                       Total time: {ConvertMinutesToHoursAndMinutes(props.totalTime)}</div>}
                sx={{ justifyContent: 'flex-start', backgroundColor: '#eeeeee' }} ></Chip>
            <Chip icon={<RestaurantOutlinedIcon />}
                label={<div className="bold">Serves: {props.serves}  {servesMeasurement(props.serves)}</div>}
                sx={{ justifyContent: 'flex-start', backgroundColor: '#eeeeee' }} ></Chip>
        </Stack>
        </div >
    )
}

export default RecipeInfo;