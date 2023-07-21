import { useContext } from "react";

import { currentProperties } from "../../app/context";

export default function Background({ id, elements, setCurrentElement }) {
  const newProperties = useContext(currentProperties);

  //----Element's default properties
  let defaultProperties = {
    backgroundColor: "#49525A",
  };

  //----If this element's id matches the user's currently selected element id assign new property values
  for (let element in newProperties) {
    if (element === id) {
      for (let property in newProperties[element]) {
        defaultProperties[property] = newProperties[element][property];
      }
    }
  }

  //----Updates the current element to be the background
  function updateCurrentElement() {
    setCurrentElement(component);
  }

  //----The component to return
  let component = (
    <div
      key={id}
      id={id}
      name={id}
      type="background"
      className="sceneC grow rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-md"
      style={defaultProperties}
      onMouseDown={updateCurrentElement} //onMouseDown vs onClick workaround, casuses very small short visual discrepency tho
    >
      {elements}
    </div>
  );

  return component;
}
