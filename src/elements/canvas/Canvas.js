import React, { useEffect, useRef, useState } from "react";
import "./canvas.css";

const canvasConfig = {
  width: 500,
  height: 500,
  drawingColor: "black",
  strokeColor: "black",
  eraseColor: "red",
  lineWidth: 5,
  alpha: 0.01,
};

const matris = [];

export const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setDrawing] = useState(false);
  const [isErasing, setErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasConfig.width;
    canvas.height = canvasConfig.height;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = canvasConfig.strokeColor;
    context.lineWidth = canvasConfig.lineWidth;
    context.globalAlpha = canvasConfig.alpha;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const context = canvasRef.current.getContext("2d");

    // var base_image = new Image();
    // base_image.src = "./descarga.jpg";
    // base_image.onload = function () {
    //   context.drawImage(base_image, 0, 0);
    // };

    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setDrawing(false);
  };

  const setThickness = (input) => {
    const newValue = input.target.value;
    const context = canvasRef.current.getContext("2d");
    context.lineWidth = newValue;
    canvasConfig.lineWidth = newValue;
  };

  const setErraser = () => {
    const context = canvasRef.current.getContext("2d");
    console.log(isErasing);
    console.log(canvasConfig.eraseColor);

    if (isErasing) {
      context.strokeColor = canvasConfig.drawingColor;
      canvasConfig.strokeColor = canvasConfig.drawingColor;
      setErasing(false);
    } else {
      context.strokeColor = canvasConfig.eraseColor;
      canvasConfig.strokeColor = canvasConfig.eraseColor;
      setErasing(true);
    }
  };

  return (
    <div className="wrapper">
      <h1>Hola</h1>
      <input type="range" min={0} max={100} onChange={setThickness}></input>
      <input type="button" onClick={setErraser}></input>
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
};
