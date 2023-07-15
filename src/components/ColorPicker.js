"use client";

import React, { useState, useContext } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ newProperty }) => {
    //const setCurrentProperties = useContext(currentProperties);
    const [color, setColor] = useState("#fff");
    const [height, setHeight] = useState("");

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    function handleNewProperty(event, property) {
        let newPropertys = {};
        newPropertys[property] = event.target.value;
        newProperty(newPropertys); //Calls home page's newProperty function and passes the as a paramater
    }

    return (
        <div style={{ position: "absolute", top: "60px", right: "10px" }}>
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
            <h2>You picked {color}</h2>
            <input
                type="text"
                placeholder="height"
                onChange={(event) => handleNewProperty(event, "height")}
                className="text-black"
            />
        </div>
    );
};

export default ColorPicker;
