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
    if (index != 0) {
      e.preventDefault();
      const updatedSteps = steps.filter((_, i) => i !== index);
      onStepsUpdate(updatedSteps);
    } else alert('You should add at least one cooking step.');
  };

  return (
    <div className="container">
      <table className="ingredient-step-table">
        <tbody>
          {steps.map((step, index) => (
            <tr key={index} className={invalidSteps.includes(index) ? 'error-row' : 'table-cell'}>
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
