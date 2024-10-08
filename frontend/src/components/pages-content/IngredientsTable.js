import React from 'react';
import './IngredientsAndSteps.css';

export const IngredientsTable = ({ ingredients, onIngredientsUpdate }) => {
  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updateIngredients = [...ingredients];
    updateIngredients[index][field] = value;
    onIngredientsUpdate(updateIngredients);
  };

  // Adding ingredient
  const handleAddRow = e => {
    e.preventDefault();
    onIngredientsUpdate([...ingredients, { amount: '', measurement: '', item: '' }]);
  };

  // Ingredient removing
  const handleRemoveRow = (e, index) => {
    e.preventDefault();
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    onIngredientsUpdate(updatedIngredients);
  };

  return (
    <div className="container">
      <table className="ingredient-step-table">
        <thead>
          <tr className="table-cell">
            <th>Amount</th>
            <th>Measure type</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr className="table-cell" key={index}>
              <td className="width-amount">
                <input
                  className="table-rows"
                  //type="number"
                  value={ingredient.amount}
                  onChange={e => handleInputChange(index, 'amount', e.target.value)}
                  placeholder="Amount"
                />
              </td>
              <td className="width-measure">
                <select
                  className="table-rows"
                  value={ingredient.measurement}
                  onChange={e => handleInputChange(index, 'measurement', e.target.value)}
                >
                  <option value="items">item(s)</option>
                  <option value="g">g</option>
                  <option value="oz">oz</option>
                  <option value="cup">cup</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                </select>
              </td>
              <td>
                <input
                  className="table-rows"
                  type="text"
                  value={ingredient.name}
                  onChange={e => handleInputChange(index, 'item', e.target.value)}
                  placeholder="Ingredient name"
                />
              </td>
              <td className="width-remove-button">
                <button
                  className="remove-ingredient-step-button"
                  onClick={e => handleRemoveRow(e, index)}
                  title="remove ingredient"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-ingredient-step-button" onClick={handleAddRow}>
        + Add ingredient
      </button>
    </div>
  );
};
