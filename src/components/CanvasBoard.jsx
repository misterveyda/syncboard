import { useEffect, useRef, useState } from "react";
import socket from "../socket";

const CanvasBoard = ({ color, brushSize }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

    ctxRef.current = ctx;
  }, [color, brushSize]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    socket.emit("draw-start", { x: offsetX, y: offsetY });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();

    socket.emit("drawing", {
      x: offsetX,
      y: offsetY,
      color,
      brushSize,
    });
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    socket.emit("draw-end");
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{ backgroundColor: "#fff" }}
    />
  );
};

export default CanvasBoard;
