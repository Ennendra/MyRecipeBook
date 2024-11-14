import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Divider, MenuItem, TableHead, TextField, Tooltip} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { default as React } from 'react';
import './IngredientsAndSteps.css';
import { handleKeyDown } from './NumericInput';

export const IngredientsTable = ({ ingredients, onIngredientsUpdate, invalidIngredients }) => {
  // Handle input changes
  const handleInputChange = (index, field, value) => {
    if (field === 'amount' && value === '-1') return;
    const updateIngredients = [...ingredients];
    updateIngredients[index] = { ...updateIngredients[index], [field]: value };
    onIngredientsUpdate(updateIngredients);
  };

  // Adding ingredient
  const handleAddRow = e => {
    e.preventDefault();
    onIngredientsUpdate([...ingredients, { amount: '', measurement: 'items', item: '', itemType: '' }]);
  };

  // Ingredient removing
  const handleRemoveRow = (e, index) => {
    if (ingredients.length > 1) {
      e.preventDefault();
      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      onIngredientsUpdate(updatedIngredients);
    } else alert('You should add at least one ingredient.');
  };

  return (
    <div className="container">
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: 'transparent', boxShadow: 'none', marginBottom: '20px' }}
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="customized  table"
          className="ingredient-step-table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Measure type</TableCell>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Type
                <Tooltip title={
                  <React.Fragment>
                    <p>{"Defining the item type helps the app more accurately convert measurements. E.g. 1 cup of water = 250g, while 1 cup of honey = 330g."}</p>
                    <p>{"If the specific item is not present, picking a similar one is also preferable. Undefined items will default to a standard density (water)."}</p>
                  </React.Fragment>
                } >
                  <InfoIcon sx={{fontSize: "medium"}}></InfoIcon>
                </Tooltip>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ingredients.map((ingredient, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell className="width-amount" sx={{ padding: 0 }}>
                  <TextField
                    align="left"
                    hiddenLabel
                    type="number"
                    inputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*' }}
                    className="table-rows"
                    value={ingredient.amount}
                    onKeyDown={handleKeyDown}
                    onChange={e => handleInputChange(index, 'amount', e.target.value)}
                    variant="filled"
                    {...(invalidIngredients.includes(index) && !ingredient.amount
                      ? {
                          error: true,
                          helperText: 'Please fill in amount.',
                        }
                      : null)}
                  />
                </TableCell>

                <TableCell className="width-measure" sx={{ padding: 0 }}>
                  <TextField
                    align="left"
                    hiddenLabel
                    select
                    className="table-rows"
                    value={ingredient.measurement}
                    onChange={e => handleInputChange(index, 'measurement', e.target.value)}
                    variant="filled"
                  >
                    <MenuItem value="items">item(s)</MenuItem>
                    <MenuItem value="g">g</MenuItem>
                    <MenuItem value="oz">oz</MenuItem>
                    <MenuItem value="cup">cup</MenuItem>
                    <MenuItem value="tbsp">tbsp</MenuItem>
                    <MenuItem value="tsp">tsp</MenuItem>
                  </TextField>
                </TableCell>

                <TableCell sx={{ padding: 0 }}>
                  <TextField
                    align="left"
                    hiddenLabel
                    type="text"
                    className="table-rows"
                    value={ingredient.item}
                    onChange={e => handleInputChange(index, 'item', e.target.value)}
                    variant="filled"
                    {...(invalidIngredients.includes(index) && !ingredient.item
                      ? {
                          error: true,
                          helperText: 'Please fill in ingredient name.',
                        }
                      : null)}
                  />
                </TableCell>

                <TableCell className="width-measure" sx={{ padding: 0 }}>
                  <TextField
                    align="left"
                    hiddenLabel
                    select
                    className="table-rows"
                    value={ingredient.itemType}
                    onChange={e => handleInputChange(index, 'itemType', e.target.value)}
                    variant="filled"
                  >
                    <MenuItem disabled >Liquids</MenuItem>
                    <MenuItem value='Water'>Water</MenuItem>
                    <MenuItem value='Wine'>Wine</MenuItem>
                    <MenuItem value='Vinegar'>Vinegar</MenuItem>
                    <Divider />
                    <MenuItem disabled >Flours/Powders</MenuItem>
                    <MenuItem value='All-Purpose Flour'>All-Purpose Flour</MenuItem>
                    <MenuItem value='Almond Flour'>Almond Flour</MenuItem>
                    <MenuItem value='Cake Flour'>Cake Flour</MenuItem>
                    <MenuItem value='Pastry Flour'>Pastry Flour</MenuItem>
                    <MenuItem value='Baking Powder'>Baking Powder</MenuItem>
                    <MenuItem value='Baking Soda/Bicarb'>Baking Soda/Bicarb</MenuItem>
                    <MenuItem value='Cocoa Powder'>Cocoa Powder</MenuItem>
                    <Divider />
                    <MenuItem disabled >Sugars</MenuItem>
                    <MenuItem value='Brown/Granulated Sugar'>Brown/Granulated Sugar</MenuItem>
                    <MenuItem value='Packed Sugar'>Packed Sugar</MenuItem>
                    <MenuItem value='Icing Sugar'>Icing Sugar</MenuItem>
                    <Divider />
                    <MenuItem disabled >Dairy</MenuItem>
                    <MenuItem value='Milk'>Milk</MenuItem>
                    <MenuItem value='Butter'>Butter</MenuItem>
                    <MenuItem value='Cream'>Cream</MenuItem>
                    <MenuItem value='Whipped Cream'>Whipped Cream</MenuItem>
                    <MenuItem value='Yoghurt (Greek)'>Yoghurt (Greek)</MenuItem>
                    <MenuItem value='Yoghurt (Plain)'>Yoghurt (Plain)</MenuItem>
                    <MenuItem value='Cheese (Mozzarella)'>Cheese (Mozzarella)</MenuItem>
                    <MenuItem value='Cheese (Other)'>Cheese (Other)</MenuItem>
                    <Divider />
                    <MenuItem disabled >Syrups</MenuItem>
                    <MenuItem value='Honey/Corn Syrup'>Honey/Corn Syrup</MenuItem>
                    <MenuItem value='Maple Syrup'>Maple Syrup</MenuItem>
                    <Divider />
                    <MenuItem disabled >Oils</MenuItem>
                    <MenuItem value='Olive/Canola/Sunflower Oil'>Olive/Canola/Sunflower Oil</MenuItem>
                    <MenuItem value='Coconut Oil'>Coconut Oil</MenuItem>
                    <Divider />
                    <MenuItem disabled >Sauces</MenuItem>
                    <MenuItem value='Ketchup/Tomato Sauce'>Ketchup/Tomato Sauce</MenuItem>
                    <MenuItem value='Soy Sauce'>Soy Sauce</MenuItem>
                    <Divider />
                    <MenuItem disabled >Herbs and Spices</MenuItem>
                    <MenuItem value='Thyme (ground)'>Thyme (ground)</MenuItem>
                    <MenuItem value='Basil (ground)'>Basil (ground)</MenuItem>
                    <MenuItem value='Oregano (ground)'>Oregano (ground)</MenuItem>
                    <MenuItem value='Paprika powder'>Paprika powder</MenuItem>
                    <MenuItem value='Chili Powder'>Chili Powder</MenuItem>
                    <MenuItem value='Chili flakes'>Chili flakes</MenuItem>
                    <Divider />
                    <MenuItem disabled >Other</MenuItem>
                    <MenuItem value='Breadcrumbs'>Breadcrumbs</MenuItem>
                    <MenuItem value='Rice (Uncooked)'>Rice (Uncooked)</MenuItem>
                    <MenuItem value='Fruits and Veg (Diced/Sliced)'>Fruits and Veg (Diced/Sliced)</MenuItem>
                    <MenuItem value='Chicken (Diced/Minced)'>Chicken (Diced/Minced)</MenuItem>
                    <MenuItem value='Other Meat (Diced/Minced)'>Other Meat (Diced/Minced)</MenuItem>
                    <Divider />
                  </TextField>
                </TableCell>

                <TableCell align="center" className="remove-row-button" sx={{ padding: 0 }}>
                  <Button
                    sx={{
                      ':active': {
                        backgroundColor: 'transparent',
                      },
                    }}
                    size="big"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    color="black"
                    className="remove-ingredient-step-button "
                    onClick={e => handleRemoveRow(e, index)}
                    title="remove ingredient"
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        startIcon={<AddOutlinedIcon />}
        onClick={handleAddRow}
        variant="contained"
        color="success"
      >
        Add ingredient
      </Button>
    </div>
  );
};
