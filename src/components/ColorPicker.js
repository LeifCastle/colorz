import { SketchPicker } from "react-color";

export default function ColorPicker({ show, handleChangeComplete, color }) {
    if (show) {
        return (
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        );
    }
}