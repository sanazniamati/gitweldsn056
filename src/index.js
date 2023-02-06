import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text } from "react-konva";
let history = [
  { x: 50, y: 50 },
  { x: 100, y: 100 },
];
let historyIndex = 0;
function App() {
  let [presentBlackRect, setPresentBlackRect] = useState(history[0]);
  let [presentRedRect, setPresentRedRect] = useState(history[1]);

  const handleUndo = () => {
    if (historyIndex === 0) {
      return;
    }
    historyIndex -= 1;
    const previous = history[historyIndex];
    if (presentRedRect) {
      setPresentRedRect(previous);
    } else if (presentBlackRect) {
      setPresentBlackRect(previous);
    }
  };

  const handleRedo = () => {
    if (historyIndex === history.length - 1) {
      return;
    }
    historyIndex += 1;
    const next = history[historyIndex];
    setPresent(next);
  };

  const handleDragEndBlackRect = (e) => {
    history = history.slice(0, historyIndex + 1);
    const position = {
      x: e.target.x(),
      y: e.target.y(),
    };
    history = history.concat([position]);
    historyIndex += 1;
    setPresentBlackRect(position);
    console.log("add black pos  :" + history.length);
  };
  const handleDragEndRedRect = (e) => {
    history = history.slice(0, historyIndex + 1);
    const position = {
      x: e.target.x(),
      y: e.target.y(),
    };
    history = history.concat([position]);
    historyIndex += 1;
    setPresentRedRect(position);
    console.log("add red pos :" + history.length);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="undo" onClick={handleUndo} />
        <Text text="redo" x={40} onClick={handleRedo} />
        <Text text={historyIndex} x={80} />
        <Rect
          x={presentBlackRect.x}
          y={presentBlackRect.y}
          width={50}
          height={50}
          fill="black"
          draggable
          onDragEnd={handleDragEndBlackRect}
        />
        <Rect
          x={presentRedRect.x}
          y={presentRedRect.y}
          width={50}
          height={50}
          fill="red"
          draggable
          onDragEnd={handleDragEndRedRect}
        />
      </Layer>
    </Stage>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
