import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import './IngredientsAndSteps.css';

export const StepsList = ({ steps, onStepsUpdate, invalidSteps }) => {
  // Handle input changes
  const handleInputChange = (index, value) => {
    const updateSteps = [...steps];
    updateSteps[index] = value;
    onStepsUpdate(updateSteps);
  };

  // Adding step
  const handleAddRow = e => {
    e.preventDefault();
    onStepsUpdate([...steps, '']);
  };

  // Step removing
  const handleRemoveRow = (e, index) => {
    if (steps.length > 1) {
      e.preventDefault();
      const updatedSteps = steps.filter((_, i) => i !== index);
      onStepsUpdate(updatedSteps);
    } else alert('You should add at least one cooking step.');
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
          <TableBody>
            {steps.map((step, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ padding: 0 }}>
                  <TextField
                    align="left"
                    hiddenLabel
                    type="text"
                    className="table-rows"
                    multiline
                    value={step}
                    onChange={e => handleInputChange(index, e.target.value)}
                    rows={'2'}
                    variant="filled"
                    {...(invalidSteps.includes(index)
                      ? {
                          error: true,
                          helperText: 'Please fill in all the instructions. Or remove empty step.',
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
                    title="remove step"
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
        Add step
      </Button>
    </div>
  );
};
