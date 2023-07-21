import { useContext } from "react";

import { currentProperties } from "../../app/context";

export default function Header({ id, setCurrentElement }) {
  const newProperties = useContext(currentProperties);

  //----Element's default properties
  let defaultProperties = {
    height: "30px",
    backgroundColor: "#7C6043",
  };

  //----If this element's id matches the user's currently selected element id assign new property values
  for (let element in newProperties) {
    if (element === id) {
      for (let property in newProperties[element]) {
        defaultProperties[property] = newProperties[element][property];
      }
    }
  }

  //----Component to return (defined as a variable to allow the currentElement state to access it)
  let component = (
    <div
      key={id}
      id={id}
      type="header"
      className={`sceneC w-sceneW text-black text-center rounded-tl-md rounded-tr-md`}
      style={defaultProperties}
      onClick={updateCurrentElement}
    >
      Header
    </div>
  );

  //----Updates current element to be this one
  function updateCurrentElement() {
    setCurrentElement(component);
  }

  return component;
}
