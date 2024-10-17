import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MenuItem, TableHead, TextField } from '@mui/material';
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
    onIngredientsUpdate([...ingredients, { amount: '', measurement: 'items', item: '' }]);
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
      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
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
        className="add-ingredient-step-button"
        onClick={handleAddRow}
        variant="contained"
        color="inherit"
      >
        Add ingredient
      </Button>
    </div>
  );
};
