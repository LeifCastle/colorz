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
  setSceneHeader,
  setSceneFooter,
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
          <Name_Delete
            elements={elements}
            setElements={setElements}
            setCurrentElement={setCurrentElement}
            setSceneHeader={setSceneHeader}
            setSceneFooter={setSceneFooter}
            key="delete"
          />,
        ];
        break;
      case "box":
        propertyList = [
          <Height handleNewProperty={handleNewProperty} key="height" />,
          <Width handleNewProperty={handleNewProperty} key="width" />,
          <Background handleNewProperty={handleNewProperty} key="background" />,
          <Name_Delete
            elements={elements}
            setElements={setElements}
            setCurrentElement={setCurrentElement}
            key="delete"
          />,
        ];
        break;
      case "textbox":
        propertyList = [
          <FontSize handleNewProperty={handleNewProperty} key="fontSize" />,
          <FontFamily handleNewProperty={handleNewProperty} key="fontFamily" />,
          <Name_Delete
            elements={elements}
            setElements={setElements}
            setCurrentElement={setCurrentElement}
            key="delete"
          />,
        ];
        break;
      case "background":
        propertyList = [
          <Background handleNewProperty={handleNewProperty} key="background" />,
          <div className="bg-[#909090] flex justify-between mt-10 rounded-bl-md rounded-br-md">
            <div className="pl-2 w-[70px]"></div>
          </div>,
        ];
        break;
    }
  }

  function handleNewProperty(value, property) {
    let newPropertys = {};
    newPropertys[property] = value;
    newProperty(newPropertys);
  }

  //----Inset property values except for Name_Delete
  let paddedList = propertyList.map((property) => {
    if (property.key != "delete") {
      return <div className="pl-2 mb-2">{property}</div>;
    } else {
      return <div>{property}</div>;
    }
  });

  return (
    <div className="flex-col items-center mt-VW1 w-full h-auto bg-pageHBg text-layoutText_Border rounded-md">
      <p
        id="propertiesName"
        className="text-center text-2xl mb-4 w-full bg-[#4E4B3C] rounded-tl-md rounded-tr-md text-gray-200"
      >
        Properties
      </p>
      <div className="">{paddedList}</div>
    </div>
  );
}
