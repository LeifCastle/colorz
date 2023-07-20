import { useContext, useState, cloneElement, useEffect } from "react";

import { currentElementContext } from "../../app/context";

export default function Name_Delete({
  elements,
  setElements,
  setCurrentElement,
}) {
  const currentElement = useContext(currentElementContext);
  const [nameDisplay, setNameDisplay] = useState(currentElement.props.name);

  //----Deletes an element from the scene
  function handleDeleteElement() {
    let newElements = [];
    elements.forEach((element) => {
      //----If the element's key does not match the currentElement's key keep it
      if (element.props.id != currentElement.props.id) {
        newElements.push(element);
      }
    });
    setElements(newElements);
  }

  //----When user mouses on an element's name, change name div to an input
  function handleMouseOver() {
    setNameDisplay(
      <input
        className="text-black w-[70px]"
        placeholder={currentElement.props.name}
      ></input>
    );
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
    <div className="bg-[#909090] flex justify-between">
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
