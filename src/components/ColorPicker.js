'use client'

import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = () => {
    const [color, setColor] = useState('#fff');

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    return (
        <div style={{ position: 'absolute', top: '60px', right: '10px' }}>
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
            <h2>You picked {color}</h2>
        </div>
    );
};

export default ColorPicker;

