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
import Empty from "../components/Empty";

import Properties from "../components/Properties";
import axios from "axios";

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

  //----Handles export data gathering and scene show/hide
  function handleExport() {
    let exportData = {};

    let exportButton = document.querySelector("#export");
    if (exportButton.textContent === "Export Theme") {
      exportButton.textContent = "Hide Export";

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
        <div className="bg-[#49525A] rounded-md p-3 overflow-y-scroll">
          <ul>{el}</ul>
        </div>
      );

      //----Disable main page buttons
      let layout = document.querySelector("#layout");
      let children = layout.querySelectorAll("*");
      children.forEach((child) => {
        child.setAttribute("disabled", "disabled");
      });

      //Hide Scene
      let scene = document.querySelector("#scene");
      let sceneD = scene.querySelectorAll("*");
      sceneD.forEach((element) => {
        element.setAttribute("hidden", "hidden");
        element.style.display = "none";
      });
    } else {
      let exportButton = document.querySelector("#export");
      exportButton.textContent = "Export Theme";
      //----Enable main page buttons
      let layout = document.querySelector("#layout");
      let scene = document.querySelector("#scene");
      let children = layout.querySelectorAll("*");
      children.forEach((child) => {
        child.removeAttribute("disabled");
      });

      //Show Scene
      let sceneD = scene.querySelectorAll("*");
      sceneD.forEach((element) => {
        element.removeAttribute("hidden");
        if (element.id != "header" && element.id != "footer") {
          element.style.display = "inline-block";
        } else {
          element.style.display = "block";
        }
      });
      setExp();
    }
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
      handleHideSelect(); //Remove current element status so there's not an annoying yellow border
      document.addEventListener("fullscreenchange", onFullscreenChange);
    }
  }

  const onFullscreenChange = () => {
    const scene = document.querySelector("#scene");
    fullscreen.current ? (scene.style.zoom = "1") : (scene.style.zoom = "1.66");
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

  function handleHideSelect() {
    setCurrentElement(<Empty type="empty" />);
    document.querySelector("#theme").setAttribute("hidden", "hidden");
  }

  function handleSave() {
    let background = document.querySelector("#moveable");
    let saveData = {
      name: "test",
      backgroundColor: background.style.backgroundColor,
      elements: [],
    };

    //Scene Elements
    elements.forEach((element) => {
      let css = document.querySelector(`#${element.props.id}`);
      let parentElement = css.parentElement;

      //--Get X/Y position
      const absolutePosition = css.getBoundingClientRect();
      const parentAbsolutePosition = parentElement.getBoundingClientRect();
      let xPosition = absolutePosition.left - parentAbsolutePosition.left;
      let yPosition = absolutePosition.top - parentAbsolutePosition.top;

      //Fix this later with CSS to prevent object being able to be there in the first place
      if (xPosition < 0) {
        xPosition = 0;
      }
      if (yPosition < 0) {
        yPosition = 0;
      }

      if (element.props.type === "box") {
        saveData.elements.push({
          type: element.props.type,
          name: element.props.name,
          xPosition: Math.floor(xPosition),
          yPosition: Math.floor(yPosition),
          width: css.style.width,
          height: css.style.height,
          backgroundColor: css.style.backgroundColor,
        });
      }
    });
    console.log("Data: ", saveData);
    axios
      .post(`http://localhost:8000/themes/new`, saveData)
      .then((res) => {
        // handleNewData();
        // router.refresh();
        console.log("res---", res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //----------Manages border for selected current element and property tab show/hide---------\\
  useEffect(() => {
    if (currentElement) {
      if (currentElement.props.type != "empty") {
        document.querySelector("#theme").removeAttribute("hidden");
      }
      //console.log("Name: ", currentElement.props.name);
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

  //----------Manages property tab show/hide when user deletes all elements from the scene---------\\
  useEffect(() => {
    if (
      elements.length === 0 &&
      sceneFooter === false &&
      sceneHeader === false
    ) {
      setCurrentElement(<Empty type="empty" />);
      document.querySelector("#theme").setAttribute("hidden", "hidden");
      scene.classList.add("rounded-tl-md");
      scene.classList.add("rounded-tr-md");
      scene.classList.add("rounded-bl-md");
      scene.classList.add("rounded-br-md");
    }
  }, [elements, sceneFooter, sceneHeader]);

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
          <div className="createError flex-col items-center">
            <div
              id="scene"
              className="flex-col w-sceneW h-sceneH mt-10 relative rounded-sm"
            >
              {exp}
              <div id="SceneHeader" className="basis-content">
                {sceneHeader}
              </div>
              <Background
                id="moveable"
                type="background"
                setCurrentElement={setCurrentElement}
                elements={elements}
              />
              <div id="SceneFooter" className="basis-content">
                {sceneFooter}
              </div>
            </div>
            <div className="grow"></div>
            <div className="flex justify-center gap-40 mt-10 text-gray-200 bg-pageHBg rounded-md h-VH5 w-[80%] mb-10">
              <div className="flex gap-2 items-center basis-3/5">
                <button className="ml-5" onClick={handleClearscreen}>
                  Clear Screen
                </button>
                <span className="mb-1 text-gray-400">|</span>
                <button onClick={handleFullscreen}>Full Screen</button>
                <span className="mb-1 text-gray-400">|</span>
                <button
                  className="pl-1 pr-1 rounded-md"
                  onClick={handleHideSelect}
                >
                  Hide Select
                </button>
              </div>
              <div className="flex gap-2 items-center justify-end mr-5 basis-2/5">
                <button
                  id="export"
                  className="pl-1 pr-1 rounded-md"
                  onClick={handleExport}
                >
                  Export Theme
                </button>
                <span className="mb-1 text-gray-400">|</span>
                <button className="pl-1 pr-1 rounded-md" onClick={handleSave}>
                  Save Theme
                </button>
              </div>
            </div>
          </div>
          <div className="h-layout_themeH w-layout_themeW ml-VW5 mr-2">
            <div id="theme" hidden="hidden">
              <Properties
                newProperty={newProperty}
                currentElement={currentElement}
                elements={elements}
                setElements={setElements}
                setCurrentElement={setCurrentElement}
                setSceneHeader={setSceneHeader}
                setSceneFooter={setSceneFooter}
              />
            </div>
          </div>
        </main>
      </currentProperties.Provider>
    </currentElementContext.Provider>
  );
}
