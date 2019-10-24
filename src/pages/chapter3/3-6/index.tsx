import React, { useRef } from "react";

import { useMatrix } from "./useMatrix";

export function ThreeSix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMatrix(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
