import React from 'react';
import './IngredientsAndSteps.css';

export const StepsList = ({ steps, onStepsUpdate }) => {
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
    e.preventDefault();
    const updatedSteps = steps.filter((_, i) => i !== index);
    onStepsUpdate(updatedSteps);
  };

  return (
    <div className="container">
      <table className="ingredient-step-table">
        <thead>
          <tr className="table-cell">
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, index) => (
            <tr className="table-cell" key={index}>
              <td>
                <textarea
                  className="table-rows"
                  type="text"
                  value={step}
                  onChange={e => handleInputChange(index, e.target.value)}
                  placeholder=""
                  rows={'3'}
                />
              </td>
              <td className="width-remove-button">
                <button
                  className="remove-ingredient-step-button "
                  onClick={e => handleRemoveRow(e, index)}
                  title="remove step"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-ingredient-step-button" onClick={handleAddRow}>
        + Add step
      </button>
    </div>
  );
};
