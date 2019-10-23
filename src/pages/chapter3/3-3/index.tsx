import React, { useRef } from "react";

import { useHelloRectangle } from "./useHelloRectangle";

export function ThreeThree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHelloRectangle(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
