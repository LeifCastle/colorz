"use client";
import { useState, useEffect, useRef } from "react";

import { currentProperties } from "./context";
import { currentElementContext } from "./context";

import PageHeader from "../components/PageHeader";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Box from "../components/Layout/Box";
import TextBox from "@/components/Layout/TextBox";

import Properties from "@/components/Properties";

export default function Home() {
  const [currentElement, setCurrentElement] = useState(); //current element context
  const boxCount = useRef("box0");
  const [elements, setElements] = useState([]); //Drag and drop elements
  const [sceneHeader, setSceneHeader] = useState(false); //Scene header
  const [sceneFooter, setSceneFooter] = useState(false); //Scene footer
  const [sceneProperties, setSceneProperties] = useState({}); //An element's height
  const [exp, setExp] = useState();
  const fullscreen = useRef(false);

  function handleNewHeader(event) {
    if (!sceneHeader) {
      event.target.classList.remove("bg-headerNoSelect");
      event.target.classList.add("bg-headerSelect");
      let newElement = (
        <Header
          key="header"
          id="header"
          type="header"
          setCurrentElement={setCurrentElement}
        />
      );
      setSceneHeader(newElement);
      setCurrentElement(newElement); //Set current element equal to this
    } else {
      event.target.classList.remove("bg-headerSelect");
      event.target.classList.add("bg-headerNoSelect");
      setSceneHeader(false);
      //Need to change current element as well
    }
  }

  function handleNewFooter(event) {
    if (!sceneFooter) {
      event.target.classList.remove("bg-headerNoSelect");
      event.target.classList.add("bg-headerSelect");
      let newElement = (
        <Footer
          key="footer"
          id="footer"
          type="footer"
          setCurrentElement={setCurrentElement}
        />
      );
      setSceneFooter(newElement);
      setCurrentElement(newElement); //Set current element equal to this
    } else {
      event.target.classList.remove("bg-headerSelect");
      event.target.classList.add("bg-headerNoSelect");
      setSceneFooter(false);
      //Need to change current element as well
    }
  }

  function handleNewBox() {
    let addBox = document.querySelector("#addBox");
    addBox.style.backgroundColor = "yellow";
    setTimeout(() => {
      addBox.style.backgroundColor = "";
    }, 100);
    let countArray = boxCount.current.split("");
    let count = parseInt(countArray.pop());
    boxCount.current = `box${count + 1}`; //Increment key/id counter
    let newElement = (
      <Box
        key={boxCount.current}
        id={boxCount.current}
        name={boxCount.current}
        type="box"
        setCurrentElement={setCurrentElement}
        handleNewProperty={newProperty}
      />
    );

    setElements([...elements, newElement]);
    setCurrentElement(newElement); //Set current element equal to this
  }

  function handleNewTextBox() {
    let countArray = boxCount.current.split("");
    let count = parseInt(countArray.pop());
    boxCount.current = `textbox${count + 1}`; //Increment key/id counter
    let newElement = (
      <TextBox
        key={boxCount.current}
        id={boxCount.current}
        type="textbox"
        setCurrentElement={setCurrentElement}
        handleNewProperty={newProperty}
      />
    );

    setElements([...elements, newElement]);
    setCurrentElement(newElement); //Set current element equal to this
  }

  function newProperty(property) {
    const propertyKey = Object.keys(property); //Get an array of properties keys (only 1)
    let newKey = propertyKey[0]; //Get the new property's key
    let propertiesCopy = { ...sceneProperties }; //Create a copy of current properties
    propertiesCopy[currentElement.key] = {
      ...sceneProperties[currentElement.key], //Assigns any previous properties to the copied element
    };
    propertiesCopy[currentElement.key][newKey] = property[newKey].toString(); //Create/update new property's key and value
    setSceneProperties(propertiesCopy); //Set the sceneProperties state to copy
  }

  //----Handles export data gathering
  function handleExport() {
    let exportData = {};
    if (sceneHeader) {
      let css = document.querySelector(`#SceneHeader`);
      exportData["header"] = {
        backgroundColor: css.firstChild.style.backgroundColor,
      };
    }
    elements.forEach((element) => {
      let css = document.querySelector(`#${element.props.id}`);
      if (element.props.type === "box") {
        exportData[element.props.name] = {
          backgroundColor: css.style.backgroundColor,
        };
      }
    });
    if (sceneFooter) {
      let css = document.querySelector(`#SceneFooter`);
      exportData["footer"] = {
        backgroundColor: css.firstChild.style.backgroundColor,
      };
    }

    let el = [];
    for (let element in exportData) {
      let elStyle = [];
      for (let style in exportData[element]) {
        elStyle.push(<div>{`${style}: ${exportData[element][style]}`}</div>);
      }
      el.push(
        <li>
          <div className="text-lg">{`#${element}${" "}`}&#123;</div>
          <div>{elStyle}</div>
          <span>&#125;</span>
        </li>
      );
    }

    setExp(
      <div>
        <ul>{el}</ul>
        <button onClick={handleHideExport}>Hide Export</button>
      </div>
    );

    //----Disable main page buttons
    let scene = document.querySelector("#scene");
    let layout = document.querySelector("#layout");
    let children = layout.querySelectorAll("*");
    let exportButton = document.querySelector("#export");
    exportButton.setAttribute("disabled", "disabled");
    children.forEach((child) => {
      child.setAttribute("disabled", "disabled");
    });
    scene.childNodes.forEach((child) => {
      child.setAttribute("hidden", "hidden");
    });
  }

  function handleHideExport() {
    //----Enable main page buttons
    let layout = document.querySelector("#layout");
    let scene = document.querySelector("#scene");
    let exportButton = document.querySelector("#export");
    let children = layout.querySelectorAll("*");
    exportButton.removeAttribute("disabled");
    children.forEach((child) => {
      child.removeAttribute("disabled");
    });
    scene.childNodes.forEach((child) => {
      child.removeAttribute("hidden");
    });
    setExp();
  }

  //----------Full Screen---------\\  Bugs present
  function handleFullscreen() {
    const scene = document.querySelector("#scene");
    if (!fullscreen.current) {
      scene.requestFullscreen();
      document.addEventListener("fullscreenchange", onFullscreenChange);
    }
  }

  const onFullscreenChange = () => {
    const scene = document.querySelector("#scene");
    fullscreen.current ? (scene.style.zoom = "1") : (scene.style.zoom = "1.67");
    fullscreen.current = !fullscreen.current;
  };

  //----------Clear Screen---------\\
  function handleClearscreen() {
    let header = document.querySelector("#sh");
    let footer = document.querySelector("#sf");
    header.classList.remove("bg-headerSelect");
    footer.classList.remove("bg-headerSelect");
    header.classList.add("bg-headerNoSelect");
    footer.classList.add("bg-headerNoSelect");
    setElements([]);
    setSceneHeader(false);
    setSceneFooter(false);
  }

  //----------Manages border for selected current element---------\\
  useEffect(() => {
    if (currentElement) {
      console.log("Name: ", currentElement.props.name);
      let allSceneElements = document.querySelectorAll(`.sceneC`);
      allSceneElements.forEach((element) => {
        if (element.id != currentElement.props.id) {
          element.style.border = "none";
        } else {
          element.style.border = "2px solid #B2B65E"; //Current Element's border
        }
      });
    }
  }, [currentElement]);

  return (
    <currentElementContext.Provider value={currentElement}>
      <currentProperties.Provider value={sceneProperties}>
        <PageHeader />
        <main className="flex justify-center w-screen">
          <div
            id="layout"
            className="mr-VW5 w-layout_themeW h-layout_themeH bg-layoutBg"
          >
            <p className="text-center text-2xl mb-4">Layout</p>
            <button
              id="sh"
              className="border-white border-2 pl-8 pr-8 mb-2 rounded-md"
              onClick={handleNewHeader}
            >
              Header
            </button>
            <br />
            <button
              id="sf"
              className="border-white border-2 pl-8 pr-8 rounded-md"
              onClick={handleNewFooter}
            >
              Footer
            </button>
            <hr></hr>
            <button
              id="addBox"
              className="flex ml-5 mt-5 justify-center items-center border-white border-2 rounded-md w-[70px] h-[70px]"
              onClick={handleNewBox}
            >
              <div>
                <span className="font-bold">+</span> Box
              </div>
            </button>
            {/* New TextBox button */}
            <button
              id="addTextBox"
              className="flex ml-5 mt-5 justify-center items-center border-white border-2 rounded-md w-[90px] h-[70px]"
              onClick={handleNewTextBox}
            >
              <div>
                <span className="font-bold">+</span> TextBox
              </div>
            </button>
          </div>
          <div>
            <div
              id="scene"
              className="flex-col w-sceneW h-sceneH mt-10 border-white border-2 rounded-sm"
            >
              {exp}
              <div id="SceneHeader" className="basis-content">
                {sceneHeader}
              </div>
              <div id="moveable" className="grow relative cursor-move">
                {elements}
              </div>
              <div id="SceneFooter" className="basis-content">
                {sceneFooter}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-10 h-20 border-white border-2"></div>
            </div>
            <div className="flex justify-center">
              <hr className="w-40"></hr>
            </div>
            <div className="flex justify-center gap-40 mt-10">
              <button
                id="export"
                className="border-white border-2 pl-1 pr-1 rounded-md"
                onClick={handleExport}
              >
                Export Theme
              </button>
              <button className="border-white border-2 pl-1 pr-1 rounded-md">
                Save Theme
              </button>
              <button onClick={handleFullscreen}>Fullscreen</button>
              <button onClick={handleClearscreen}>Clear Screen</button>
            </div>
          </div>
          <div
            id="theme"
            className="ml-VW5 w-layout_themeW h-layout_themeH bg-layoutBg"
          >
            <Properties
              newProperty={newProperty}
              currentElement={currentElement}
              elements={elements}
              setElements={setElements}
              setCurrentElement={setCurrentElement}
            />
          </div>
        </main>
      </currentProperties.Provider>
    </currentElementContext.Provider>
  );
}
