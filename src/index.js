import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text } from "react-konva";
let history = [{ x1: 50, y1: 50, x2: 100, y2: 100 }];
let historyIndex = 0;
function App() {
  let [presentBlackRect, setPresentBlackRect] = useState(history[0]);
  let [presentRedRect, setPresentRedRect] = useState(history[1]);
  let [presentRect, setPresentRect] = useState(history[0]);

  const handleUndo = () => {
    if (historyIndex === 0) {
      return;
    }
    historyIndex -= 1;
    const previous = history[historyIndex];
    setPresentBlackRect(previous);
  };

  const handleRedo = () => {
    if (historyIndex === history.length - 1) {
      return;
    }
    historyIndex += 1;
    const next = history[historyIndex];
    setPresentBlackRect(next);
  };

  const handleDragEndRect = (e) => {
    history = history.slice(0, historyIndex + 1);

    const position = {
      x1: e.target.x(),
      y1: e.target.y(),
      x2: e.target.x(),
      y2: e.target.y(),
    };
    history = history.concat([position]);
    historyIndex += 1;
    setPresentRect(position);
    // setPresentBlackRect(position);
    // setPresentRedRect(position);
    console.log("add black pos  :" + history.length);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="undo" onClick={handleUndo} />
        <Text text="redo" x={40} onClick={handleRedo} />
        <Text text={historyIndex} x={80} />
        <Rect
          x={presentRect.x1}
          y={presentRect.y1}
          width={50}
          height={50}
          fill="black"
          draggable
          onDragEnd={handleDragEndRect}
        />
        <Rect
          x={presentRect.x2}
          y={presentRect.y2}
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
