import { useState } from "react";

interface UseHistoryProps<T> {
  points: Array<T>;
  setPoints: (array: Array<T>) => void;
}

function useHistory<T>({ points, setPoints }: UseHistoryProps<T>) {
  const [undoStack, setUndoStack] = useState<T[]>([]);
  const [redoStack, setRedostack] = useState<T[]>([]);

  const handleUndo = () => {
    const lastAction = points.pop();

    if (lastAction) {
      setRedostack([...redoStack, lastAction]);
      setPoints([...points]);
    }
  };

  const handleRedo = () => {
    const lastAction = redoStack.pop();

    if (lastAction) {
      setUndoStack([...undoStack, lastAction]);
      setPoints([...points, lastAction]);
    }
  };

  return {
    undoStack,
    redoStack,
    handleUndo,
    handleRedo,
  };
}

export default useHistory;
