import { Rnd } from "react-rnd";
import { useContext, useState, useEffect, cloneElement } from "react";

import { currentProperties } from "../../app/context";
import { currentElementContext } from "../../app/context";

export default function Box({ id, name, setCurrentElement }) {
  //----Context
  const newProperties = useContext(currentProperties);
  const currentElement = useContext(currentElementContext);

  //----State
  const [x, setX] = useState(100); //The box's x position relative to its parent
  const [y, setY] = useState(100); //The box's y position relative to its parent
  const [width, setWidth] = useState("50px"); //The box's width
  const [height, setHeight] = useState("50px"); //The box's height

  //----Element's default properties
  let defaultProperties = {
    backgroundColor: "#2A2A2A",
  };

  //----If this element's id matches the theme element's id assign new property values,
  for (let element in newProperties) {
    console.log("Element: ", element, "Id: ", id);
    if (element === id) {
      for (let property in newProperties[element]) {
        if (property !== "width" && property != "height") {
          defaultProperties[property] = newProperties[element][property];
        }
      }
    }
  }

  //----useEffect required in order to prevent element from continually rerendering because setHeight and setWidth statees are directly called in this function
  let cEPropsId;

  if (currentElement != "hide") {
    cEPropsId = currentElement.props.id;
  }

  useEffect(() => {
    for (let element in newProperties) {
      //If this element's id matches the theme element's id and is current selected assign new height/width
      if (element === id && element === cEPropsId) {
        for (let property in newProperties[element]) {
          if (property === "width") {
            setWidth(newProperties[element][property]);
          } else if (property === "height") {
            setHeight(newProperties[element][property]);
          }
        }
      }
    }
  }, [newProperties, cEPropsId, id]);

  //----Component to return (defined as a variable to allow the currentElement state to access it)
  let component = (
    <Rnd
      key={id}
      id={id}
      name={name}
      type="box"
      className={`sceneC bg-[#696767] rounded-md`}
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
    ></Rnd>
  );

  //----Updates current element to be this one
  function updateCurrentElement() {
    setCurrentElement(component);
  }

  return component;
}
