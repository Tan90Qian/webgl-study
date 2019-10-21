import React, { useRef } from "react";

import { useClickedPoints } from "./useClickedPoints";

export function TwoFour() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useClickedPoints(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
