import { useContext, useState, cloneElement, useEffect } from "react";

import { currentElementContext } from "../../app/context";

export default function Name_Delete({
  elements,
  setElements,
  setCurrentElement,
  setSceneHeader,
  setSceneFooter,
}) {
  const currentElement = useContext(currentElementContext);
  const [nameDisplay, setNameDisplay] = useState(currentElement.props.name);

  //----Deletes an element from the scene
  function handleDeleteElement() {
    if (currentElement.props.type === "header") {
      let scene = document.querySelector("#moveable");
      scene.classList.add("rounded-tl-md");
      scene.classList.add("rounded-tr-md");
      let sh = document.querySelector("#sh");
      sh.classList.remove("border-lhfBorderSelect");
      sh.classList.add("border-lhfBorderNoSelect");
      sh.classList.remove("bg-lhfBackgroundSelect");
      sh.classList.add("bg-lhfBackgroundNoSelect");
      setSceneHeader(false);
    } else if (currentElement.props.type === "footer") {
      let scene = document.querySelector("#moveable");
      scene.classList.add("rounded-tl-md");
      scene.classList.add("rounded-tr-md");
      let sf = document.querySelector("#sf");
      sf.classList.remove("border-lhfBorderSelect");
      sf.classList.add("border-lhfBorderNoSelect");
      sf.classList.remove("bg-lhfBackgroundSelect");
      sf.classList.add("bg-lhfBackgroundNoSelect");
      setSceneFooter(false);
    } else {
      let newElements = [];
      elements.forEach((element) => {
        //----If the element's key does not match the currentElement's key keep it
        if (element.props.id != currentElement.props.id) {
          newElements.push(element);
        }
      });
      setElements(newElements);
    }
  }

  //----When user mouses on an element's name, change name div to an input
  function handleMouseOver() {
    if (
      currentElement.props.type != "header" &&
      currentElement.props.type != "footer"
    ) {
      setNameDisplay(
        <input
          className="text-black w-[70px]"
          placeholder={currentElement.props.name}
        ></input>
      );
    }
  }

  //----When user mouses off an element's name, change input to name div and update element's name (id)
  function handleMouseOut(event) {
    if (event.target.value) {
      let newElements = [];
      elements.forEach((element) => {
        //----If the element's key does not match the currentElement's key keep it
        if (element.props.id === currentElement.props.id) {
          let name = event.target.value;
          const editableCopy = cloneElement(element, {
            name,
          });
          newElements.push(editableCopy);
          setCurrentElement(editableCopy);
        } else {
          newElements.push(element);
        }
      });
      setElements(newElements);
    }
    setNameDisplay(currentElement.props.name);
  }

  //----Updates display name when user changes the current Element
  useEffect(() => {
    setNameDisplay(currentElement.props.name);
  }, [currentElement]);

  return (
    <div className="bg-[#909090] flex justify-between mt-10 rounded-bl-md rounded-br-md">
      <div
        className="pl-2 w-[70px]"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {nameDisplay}
      </div>
      <button className="text-[#771616] pr-2" onClick={handleDeleteElement}>
        Delete
      </button>
    </div>
  );
}
