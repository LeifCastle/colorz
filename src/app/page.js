"use client";
import { useState, useRef } from "react";

import { currentProperties } from "./context";

import HeaderInfinte from "../components/HeaderInfinite";
import ColorPicker from "@/components/ColorPicker";

export default function Home() {
  const [elements, setElements] = useState([]);
  const [currentElement, setCurrentElement] = useState(null);
  const headerExists = useRef(false);
  const [sceneProperties, setSceneProperties] = useState({}); //An element's height

  function handleNewHeader(event) {
    if (!headerExists.current) {
      event.target.classList.remove("bg-headerNoSelect");
      event.target.classList.add("bg-headerSelect");
      headerExists.current = true;
      let newElement = <HeaderInfinte key="header" id="header" />;
      setElements([...elements, newElement]);
      setCurrentElement(newElement);
    } else {
      event.target.classList.remove("bg-headerSelect");
      event.target.classList.add("bg-headerNoSelect");
      headerExists.current = false;
      let newElements = elements.filter((element) => {
        if (element.key != "header") {
          return element;
        }
      });
      setElements([newElements]);
    }
  }

  function newProperty(property) {
    const propertyKey = Object.keys(property); //Get an array of properties keys (only 1)
    let newKey = propertyKey[0]; //Get the new property'skey
    let sceneProperties = { elementKey: currentElement.key }; //Add current element's key
    sceneProperties[newKey] = property[newKey].toString(); //Add new property's key and it's value
    setSceneProperties(sceneProperties); //Set the sceneProperties state to above created object
  }

  return (
    <currentProperties.Provider value={sceneProperties}>
      <main className="flex justify-center w-screen">
        <div
          id="layout"
          className="mr-VW5 w-layout_themeW h-layout_themeH bg-layoutBg"
        >
          <p className="text-center text-2xl mb-4">Layout</p>
          <button
            className="border-white border-2 pl-8 pr-8 mb-2 rounded-md"
            onClick={handleNewHeader}
          >
            Header
          </button>
          <br />
          <button className="border-white border-2 pl-8 pr-8 rounded-md">
            Footer
          </button>
        </div>
        <div>
          <div
            id="scene"
            className="w-sceneW h-sceneH mt-10 border-white border-2 rounded-sm"
          >
            {elements}
          </div>
          <div className="flex justify-center">
            <div className="w-10 h-20 border-white border-2"></div>
          </div>
          <div className="flex justify-center">
            <hr className="w-40"></hr>
          </div>
          <div className="flex justify-center gap-40 mt-10">
            <button className="border-white border-2 pl-1 pr-1 rounded-md">
              Export Theme
            </button>
            <button className="border-white border-2 pl-1 pr-1 rounded-md">
              Save Theme
            </button>
          </div>
        </div>
        <div
          id="theme"
          className="ml-VW5 w-layout_themeW h-layout_themeH bg-layoutBg"
        >
          <ColorPicker newProperty={newProperty} />
        </div>
      </main>
    </currentProperties.Provider>
  );
}