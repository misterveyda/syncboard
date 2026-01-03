import { useState } from "react";
import Toolbar from "./components/Toolbar";
import CanvasBoard from "./components/CanvasBoard";
import { socket } from "./socket";

const App = () => {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);

  const clearBoard = () => {
    socket.emit("clear");
  };

  return (
    <>
      <Toolbar
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        clearBoard={clearBoard}
      />
      <CanvasBoard color={color} size={size} />
    </>
  );
};

export default App;
