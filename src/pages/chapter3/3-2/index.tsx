import React, { useRef } from "react";

import { useHelloTriangle } from "./useHelloTriangle";

export function ThreeTwo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHelloTriangle(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
