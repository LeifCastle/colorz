"use client";
import { useState, useEffect, useRef } from "react";

import { currentProperties } from "./context";
import { currentElementContext } from "./context";

import PageHeader from "../components/PageHeader";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Box from "../components/Layout/Box";
import TextBox from "../components/Layout/TextBox";
import Background from "../components/Layout/Background";

import Properties from "../components/Properties";

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
    let scene = document.querySelector("#moveable");
    if (!sceneHeader) {
      //Remove rounding
      scene.classList.remove("rounded-tl-md");
      scene.classList.remove("rounded-tr-md");
      //Border
      event.target.classList.remove("border-lhfBorderNoSelect");
      event.target.classList.add("border-lhfBorderSelect");
      //Bacground
      event.target.classList.remove("bg-lhfBackgroundNoSelect");
      event.target.classList.add("bg-lhfBackgroundSelect");
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
      scene.classList.add("rounded-tl-md");
      scene.classList.add("rounded-tr-md");
      ///Border
      event.target.classList.remove("border-lhfBorderSelect");
      event.target.classList.add("border-lhfBorderNoSelect");
      //Background
      event.target.classList.remove("bg-lhfBackgroundSelect");
      event.target.classList.add("bg-lhfBackgroundNoSelect");
      setSceneHeader(false);
      //Need to change current element as well
    }
  }

  function handleNewFooter(event) {
    let scene = document.querySelector("#moveable");
    if (!sceneFooter) {
      //Remove rounding
      scene.classList.remove("rounded-bl-md");
      scene.classList.remove("rounded-br-md");
      //Border
      event.target.classList.remove("border-lhfBorderNoSelect");
      event.target.classList.add("border-lhfBorderSelect");
      //Bacground
      event.target.classList.remove("bg-lhfBackgroundNoSelect");
      event.target.classList.add("bg-lhfBackgroundSelect");

      //Show footer selection in Layout
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
      scene.classList.add("rounded-bl-md");
      scene.classList.add("rounded-br-md");
      ///Border
      event.target.classList.remove("border-lhfBorderSelect");
      event.target.classList.add("border-lhfBorderNoSelect");
      //Background
      event.target.classList.remove("bg-lhfBackgroundSelect");
      event.target.classList.add("bg-lhfBackgroundNoSelect");
      setSceneFooter(false);
      //Need to change current element as well
    }
  }

  function handleNewBox(event) {
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

    //--Background
    let css = document.querySelector(`#moveable`);
    exportData["background"] = { backgroundColor: css.style.backgroundColor };

    //Header
    if (sceneHeader) {
      let css = document.querySelector(`#SceneHeader`);
      exportData["header"] = {
        backgroundColor: css.firstChild.style.backgroundColor,
      };
    }

    //Scene Elements
    elements.forEach((element) => {
      let css = document.querySelector(`#${element.props.id}`);
      if (element.props.type === "box") {
        exportData[element.props.name] = {
          backgroundColor: css.style.backgroundColor,
        };
      }
    });

    //Footer
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
          <div className="text-yellow-200">{`#${element}${" "}`}&#123;</div>
          <div className="text-white ml-4">{elStyle}</div>
          <span className="text-yellow-200">&#125;</span>
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

  //----Handles css properties to visually show user they clicked
  function handleLayoutButtonMouseDown(e) {
    e.target.classList.remove("border-lhfBorderNoSelect");
    e.target.classList.add("border-lhfBorderSelect");
    e.target.classList.remove("bg-lhfBackgroundNoSelect");
    e.target.classList.add("bg-lhfBackgroundSelect");
  }

  function handleLayoutButtonMouseUp(e) {
    setTimeout(() => {
      e.target.classList.remove("border-lhfBorderSelect");
      e.target.classList.add("border-lhfBorderNoSelect");
      e.target.classList.remove("bg-lhfBackgroundSelect");
      e.target.classList.add("bg-lhfBackgroundNoSelect");
    }, 50);
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
    let scene = document.querySelector("#moveable");
    scene.classList.add("rounded-tl-md");
    scene.classList.add("rounded-tr-md");
    scene.classList.add("rounded-bl-md");
    scene.classList.add("rounded-br-md");
    let header = document.querySelector("#sh");
    let footer = document.querySelector("#sf");
    header.classList.remove("border-lhfBorderSelect");
    header.classList.add("border-lhfBorderNoSelect");
    header.classList.remove("bg-lhfBackgroundSelect");
    header.classList.add("bg-lhfBackgroundNoSelect");
    footer.classList.remove("border-lhfBorderSelect");
    footer.classList.add("border-lhfBorderNoSelect");
    footer.classList.remove("bg-lhfBackgroundSelect");
    footer.classList.add("bg-lhfBackgroundNoSelect");
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
        <main className="flex justify-center w-screen bg-layoutBg">
          <div
            id="layout"
            className="flex-col items-center mr-VW5 mt-VW1 ml-2 w-layout_themeW h-layoutH bg-pageHBg text-layoutText_Border rounded-md" //#241B1B
          >
            <p className="text-center text-2xl mb-4 w-full bg-[#4E4B3C] rounded-tl-md rounded-tr-md text-gray-200">
              Layout
            </p>
            <div className="flex justify-center gap-2 mb-3">
              <button
                id="sh"
                className="border-lhfBorderNoSelect bg-lhfBackgroundNoSelect border-2 pl-4 pr-4 h-[35px] rounded-md"
                onClick={handleNewHeader}
              >
                Header
              </button>
              <button
                id="sf"
                className="border-lhfBorderNoSelect bg-lhfBackgroundNoSelect border-2 pl-4 pr-4 h-[35px] rounded-md"
                onClick={handleNewFooter}
              >
                Footer
              </button>
            </div>
            <hr className="w-full"></hr>
            <button
              id="addBox"
              className="mt-5 bg-lhfBackgroundNoSelect border-lhfBorderNoSelect border-2 rounded-md w-VW12 h-[70px]"
              onClick={handleNewBox}
              onMouseDown={handleLayoutButtonMouseDown}
              onMouseUp={handleLayoutButtonMouseUp}
            >
              Add Box
            </button>
            <button
              id="addTextBox"
              className="flex mt-5 justify-center items-center bg-lhfBackgroundNoSelect border-lhfBorderNoSelect border-2 rounded-md w-VW12 h-[40px]"
              onClick={handleNewTextBox}
              onMouseDown={handleLayoutButtonMouseDown}
              onMouseUp={handleLayoutButtonMouseUp}
            >
              Add Text
            </button>
          </div>
          <div>
            <div
              id="scene"
              className="flex-col w-sceneW h-sceneH mt-10  rounded-sm"
            >
              {exp}
              <div id="SceneHeader" className="basis-content">
                {sceneHeader}
              </div>
              <Background
                id="moveable"
                elements={elements}
                setCurrentElement={setCurrentElement}
              />
              <div id="SceneFooter" className="basis-content">
                {sceneFooter}
              </div>
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
