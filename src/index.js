import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text } from "react-konva";
let history = [
  { x: 50, y: 50 },
  { x: 100, y: 100 },
];
let historyIndex = 0;
function App() {
  let [presentRect, setPresentRect] = useState(history[0]);

  const handleUndo = () => {
    if (historyIndex === 0) {
      return;
    }
    historyIndex -= 1;
    const previous = history[historyIndex];
    setPresentRect(previous);
  };

  const handleRedo = () => {
    if (historyIndex === history.length - 1) {
      return;
    }
    historyIndex += 1;
    const next = history[historyIndex];
    setPresentRect(next);
  };

  const handleDragEndRect = (e) => {
    history = history.slice(0, historyIndex + 1);
    const position = {
      x: e.target.x(),
      y: e.target.y(),
    };
    history = history.concat([position]);
    historyIndex += 1;
    setPresentRect(position);
    console.log("add black pos  :" + history.length);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="undo" onClick={handleUndo} />
        <Text text="redo" x={40} onClick={handleRedo} />
        <Text text={historyIndex} x={80} />
        <Rect
          x={presentRect.x}
          y={presentRect.y}
          width={50}
          height={50}
          fill="black"
          draggable
          onDragEnd={handleDragEndRect}
        />
        <Rect
          x={presentRect.x + 50}
          y={presentRect.y}
          width={50}
          height={50}
          fill="red"
          draggable
          onDragEnd={handleDragEndRect}
        />
      </Layer>
    </Stage>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
