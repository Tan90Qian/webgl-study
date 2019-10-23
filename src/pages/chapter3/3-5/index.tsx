import React, { useRef } from "react";

import { useRotatedTriangle } from "./useRotatedTriangle";

export function ThreeFive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useRotatedTriangle(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
