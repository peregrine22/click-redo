import { Point } from "./types/Point.types";
import { MouseEvent, useState } from "react";
import "./App.css";
import useHistory from "./hooks/useHistory";

function App() {
  const [points, setPoints] = useState<Point[]>([]);

  const handlePlaceCircle = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    setPoints([...points, { x, y }]);
  };

  const { handleRedo, handleUndo, redoStack } = useHistory<Point>({
    points,
    setPoints,
  });

  return (
    <>
      <button
        disabled={points.length === 0}
        onClick={handleUndo}
        autoFocus={false}
      >
        undo
      </button>
      <button
        disabled={redoStack.length < 1}
        onClick={handleRedo}
        autoFocus={false}
      >
        redo
      </button>
      <div className="app" onClick={handlePlaceCircle}>
        {points.map((point) => (
          <div
            key={Math.random() * 1000000}
            className="circle"
            style={{ top: point.y, left: point.x }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
