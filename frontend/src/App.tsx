import { useState } from "react";
import CanvasBoard from "./components/CanvasBoard";
import Toolbar from "./components/Toolbar";

function App() {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);

  return (
    <div>
      <Toolbar
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
      />
      <CanvasBoard color={color} brushSize={brushSize} />
    </div>
  );
}

export default App;
