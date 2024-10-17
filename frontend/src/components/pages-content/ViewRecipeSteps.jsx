import React, {useState} from "react";
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Stack from "@mui/material/Stack";





function ExpandStepsList(stepList) {
    const [checked, setChecked] = useState([]);
    const handleToggle = (index) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    }
    return (
        <Stack>{stepList.map((step, index) => (
            <ListItem disablePadding key={index}
            >
                <ListItemButton onClick={()=> handleToggle(index)}>
                    <ListItemIcon>
                        <Checkbox 
                        color="success"
                        checked = {checked[index] || false}
                        onChange={() => handleToggle(index)}
                        />
                    </ListItemIcon>
                    <ListItemText primary={step} sx={{ textDecoration: checked[index] && 'line-through'}} />
                </ListItemButton>
            </ListItem >
            ))
            }
        </Stack>
    )
}

function ViewRecipeSteps(props) {
    return (
        <div className='viewRecipeContainer'>
            <h3>Steps:</h3>
            <List sx={{ width: '100%', maxWidth: 960, bgcolor: '#eeeeee' }} aria-label="contacts">
                {ExpandStepsList(props.cookingSteps)}
            </List>
        </div>)
}

export default ViewRecipeSteps;