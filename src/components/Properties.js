"use client";
import { useContext } from "react";
import { currentElementContext } from "../app/context";

import Height from "./Properties/Height";
import Width from "./Properties/Width";
import Background from "./Properties/Background";
import Name_Delete from "./Properties/Name_Delete";
import FontSize from "./Properties/FontSize";
import FontFamily from "./Properties/FontFamily";

export default function Properties({
  newProperty,
  elements,
  setElements,
  setCurrentElement,
}) {
  const currentElement = useContext(currentElementContext);
  let propertyList = [];
  if (currentElement) {
    let type = currentElement.props.type;
    switch (type) {
      case "header":
      case "footer":
        propertyList = [
          <Height handleNewProperty={handleNewProperty} key="height" />,
          <Background handleNewProperty={handleNewProperty} key="background" />,
        ];
        break;
      case "box":
        propertyList = [
          <Name_Delete
            elements={elements}
            setElements={setElements}
            setCurrentElement={setCurrentElement}
            key="delete"
          />,
          <Height handleNewProperty={handleNewProperty} key="height" />,
          <Width handleNewProperty={handleNewProperty} key="width" />,
          <Background handleNewProperty={handleNewProperty} key="background" />,
        ];
        break;
      case "textbox":
        propertyList = [
          <Name_Delete
            elements={elements}
            setElements={setElements}
            setCurrentElement={setCurrentElement}
            key="delete"
          />,
          <FontSize handleNewProperty={handleNewProperty} key="fontSize" />,
          <FontFamily handleNewProperty={handleNewProperty} key="fontFamily" />,
        ];
        break;
    }
  }

  function handleNewProperty(value, property) {
    let newPropertys = {};
    newPropertys[property] = value;
    newProperty(newPropertys);
  }

  return <div>{propertyList}</div>;
}
