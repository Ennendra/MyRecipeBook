import React, { useEffect, useState } from 'react';
import './Settings.css';

export const Settings = () => {
  const types = ['g', 'oz', 'cups', 'tsp', 'tbsp'];

  // State to track the selected values
  const [selections, setSelections] = useState(
    types.reduce((acc, type) => {
      acc[type] = 'g'; // Defaulting all selections to 'g'
      return acc;
    }, {})
  );

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('localTypesSettings');
    if (savedSettings) {
      setSelections(JSON.parse(savedSettings));
    }
  }, []);

  // Handle selection changes
  const handleSelectionChange = (event, type) => {
    setSelections({
      ...selections,
      [type]: event.target.value,
    });
  };

  // Save settings to localStorage
  function SaveSettings(event) {
    event.preventDefault(); // Prevent page reload
    localStorage.setItem('localTypesSettings', JSON.stringify(selections));
    alert('Settings saved successfully!');
  }

  return (
    <form onSubmit={SaveSettings}>
      <div>
        <h1 className="page-title">Settings</h1>
        <h2 className="textStyle">Convert setting</h2>
        <p className="textStyle">
          Convert setting will automatically adjust recipe measurements to your preferred units. For
          example:
        </p>
        <ul className="listStyle">
          <li>Ounces (oz) will be converted to grams (g) in recipes. </li>
          <li>
            Ingredients listed without specific measurements (e.g., items) will not be converted.{' '}
          </li>
        </ul>
      </div>

      <div className="table-button-center">
        <table className="type-table">
          <thead>
            <tr className="table-cells">
              <th>Original type</th>
              <th>Goal type</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type, index) => (
              <tr className="table-cells" key={index}>
                <td>{type}</td>
                <td>
                  <select
                    className="table-cells"
                    value={selections[type]}
                    onChange={event => handleSelectionChange(event, type)}
                  >
                    <option value="g">g</option>
                    <option value="oz">oz</option>
                    <option value="cups">cups</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="confirm-button" type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};
