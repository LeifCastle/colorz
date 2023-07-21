import { useContext } from "react";

import { currentProperties } from "../../app/context";
import { currentElementContext } from "../../app/context";

export default function Height({ handleNewProperty }) {
  const newProperties = useContext(currentProperties);
  const currentElement = useContext(currentElementContext);

  return (
    <>
      <p>Height: </p>
      <input
        type="text"
        placeholder="30px"
        value={
          newProperties[currentElement.props.id]
            ? newProperties[currentElement.props.id].height
            : ""
        }
        onChange={(event) => handleNewProperty(event.target.value, "height")}
        className="text-white bg-slate-600 rounded-md w-[70px]"
      />
    </>
  );
}
