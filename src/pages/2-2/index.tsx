import React, { useRef } from "react";

import { useHelloCanvas } from "./useHelloCanvas";

export function TwoTwo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHelloCanvas(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
