import React, { useRef } from "react";

import { useRotatedTranslatedTriangle } from "./useRotatedTranslatedTriangle";

export function FourTwo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useRotatedTranslatedTriangle(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
