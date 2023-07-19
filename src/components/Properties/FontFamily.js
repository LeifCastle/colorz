import React, { useState } from 'react';

function FontFamily({ handleNewProperty }) {
  const [fontFamily, setFontFamily] = useState('Arial');

  const handleChange = (e) => {
    setFontFamily(e.target.value);
    handleNewProperty(e.target.value, 'fontFamily');
  };

  return (
    <div className="property-container">
      <label htmlFor="fontFamily">Font Family:</label>
      <select id="fontFamily" value={fontFamily} onChange={handleChange}>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        {/* Add more font options as needed */}
      </select>
    </div>
  );
}

export default FontFamily;
