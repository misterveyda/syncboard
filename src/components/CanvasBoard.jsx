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

  useEffect(() => {
    socket.on("draw-start", ({ x, y }) => {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(x, y);
    });

    socket.on("drawing", ({ x, y, color, brushSize }) => {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = brushSize;
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    });

    socket.on("draw-end", () => {
      ctxRef.current.closePath();
    });

    return () => {
      socket.off("draw-start");
      socket.off("drawing");
      socket.off("draw-end");
    };
  }, []);

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
