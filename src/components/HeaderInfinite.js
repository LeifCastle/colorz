import { useContext } from "react";

import { currentProperties } from "../app/context";

export default function HeaderInfinite({ id }) {
    const newProperties = useContext(currentProperties);

    //----Element's default properties
    let defaultProperties = {
        height: "12px",
    };

    //----If this element's id (key) matches the user's currently selected element id assign new property values and show s
    if (newProperties.elementKey === id) {
        for (let key in newProperties) {
            if (key != "elementKey") {
                defaultProperties[key] = `${newProperties[key]}px`; //Assign new value to key
            }
        }
    }
    return (
        <div
            className={`w-sceneW bg-headerNoSelect text-black text-center`}
            style={defaultProperties}
        >
            Header
        </div>
    );
}