import { Rnd } from "react-rnd";
import { useContext, useState, useEffect, useRef } from "react";

import { currentProperties } from "../../app/context";
import { currentElementContext } from "../../app/context";

export default function TextBox({ id, setCurrentElement, handleNewProperty }) {
    //----Context
    const newProperties = useContext(currentProperties);
    const currentElement = useContext(currentElementContext);

    //----State
    const [x, setX] = useState(100); //The box's x position relative to its parent
    const [y, setY] = useState(100); //The box's y position relative to its parent
    const [width, setWidth] = useState("200px"); //The box's width
    const [height, setHeight] = useState("50px"); //The box's height

    const textBoxRef = useRef(null);

    //----Element's default properties
    let defaultProperties = {
        backgroundColor: "transparent",
        color: "#FFF",
        border: "none",
        fontSize: "16px",
    };

    //----If this element's id matches the theme element's id assign new property values,
    for (let element in newProperties) {
        if (element === id) {
            for (let property in newProperties[element]) {
                if (property !== "width" && property != "height") {
                    defaultProperties[property] = newProperties[element][property];
                }
            }
        }
    }

    //----useEffect required in order to prevent element from continually rerendering because setHeight and setWidth states are directly called in this function
    useEffect(() => {
        for (let element in newProperties) {
            //If this element's id matches the theme element's id and is current selected assign new height/width
            if (element === id && element === currentElement.props.id) {
                for (let property in newProperties[element]) {
                    if (property === "width") {
                        setWidth(newProperties[element][property]);
                    } else if (property === "height") {
                        setHeight(newProperties[element][property]);
                    }
                }
            }
        }
    }, [newProperties]);

    //----Component to return (defined as a variable to allow the currentElement state to access it)
    let component = (
        <Rnd
            key={id}
            id={id}
            type="textbox"
            className={`sceneC bg-[#696767]`}
            style={defaultProperties}
            bounds={"parent"}
            size={{
                width: width,
                height: height,
            }}
            position={{ x: x, y: y }}
            onDragStop={(e, d) => {
                setX(d.x);
                setY(d.y);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWidth(ref.style.width);
                setHeight(ref.style.height);
                setX(position.x);
                setY(position.y);
            }}
            onDrag={updateCurrentElement}
            onResize={updateCurrentElement}
            onClick={updateCurrentElement}
        >
            <div
                ref={textBoxRef}
                contentEditable={true}
                style={{ width: "100%", height: "100%", outline: "none" }}
                onInput={(e) => {
                    // Handle text input if needed
                }}
            >
                Type here...
            </div>
        </Rnd>
    );

    //----Updates current element to be this one
    function updateCurrentElement() {
        setCurrentElement(component);
        defaultProperties.border = "2px solid #B2B65E";  // Add a border when selected
    }

    return component;
}

