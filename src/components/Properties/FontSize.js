import React, { useState } from 'react';

function FontSize({ handleNewProperty }) {
  const [fontSize, setFontSize] = useState('16px');

  const handleChange = (e) => {
    setFontSize(e.target.value);
    handleNewProperty(e.target.value, 'fontSize');
  };

  return (
    <div className="property-container">
      <label htmlFor="fontSize">Font Size:</label>
      <input
        type="text"
        id="fontSize"
        value={fontSize}
        onChange={handleChange}
        placeholder="e.g. 16px, 1em, 1rem"
      />
    </div>
  );
}

export default FontSize;
