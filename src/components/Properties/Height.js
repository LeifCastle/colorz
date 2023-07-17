import { useContext } from "react";

import { currentProperties } from "../../app/context";
import { currentElementContext } from "../../app/context";

export default function Height({ handleNewProperty }) {
  const newProperties = useContext(currentProperties);
  const currentElement = useContext(currentElementContext);

  if (currentElement) {
    console.log("Current Element: ", currentElement);
  }
  console.log("rendered");

  return (
    <>
      <p>Height: </p>
      <input
        type="text"
        placeholder="20px"
        value={
          newProperties[currentElement]
            ? newProperties[currentElement].height
            : ""
        }
        onChange={(event) => handleNewProperty(event.target.value, "height")}
        className="text-white bg-slate-600 rounded-md w-[70px]"
      />
    </>
  );
}