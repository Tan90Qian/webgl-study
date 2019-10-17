import React, { useRef } from "react";
import { useDrawingRectangle } from "./useDrawingRectangle";

export function TwoOne() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDrawingRectangle(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
