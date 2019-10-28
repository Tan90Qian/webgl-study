import React, { useRef } from "react";

import { useRotatedTriangleMatrix4 } from "./useRotatedTriangleMatrix4";

export function FourOne() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useRotatedTriangleMatrix4(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
