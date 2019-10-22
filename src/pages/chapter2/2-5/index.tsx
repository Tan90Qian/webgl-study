import React, { useRef } from "react";

import { useColoredPoints } from "./useColoredPoints";

export function TwoFive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useColoredPoints(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
