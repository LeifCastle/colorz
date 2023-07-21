import { useContext } from "react";

import { currentProperties } from "../../app/context";

export default function Footer({ id, setCurrentElement }) {
  const newProperties = useContext(currentProperties);

  //----Element's default properties
  let defaultProperties = {
    height: "25px",
    backgroundColor: "#464331",
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
      type="footer"
      className={`sceneC w-sceneW text-black text-center rounded-bl-md rounded-br-md`}
      style={defaultProperties}
      onClick={updateCurrentElement}
    >
      Footer
    </div>
  );

  //----Updates current element to be this one
  function updateCurrentElement() {
    setCurrentElement(component);
  }

  return component;
}
