import React, { useRef } from "react";

import { useHelloPoint1 } from "./useHelloPoint1";

export function TwoTwo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHelloPoint1(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
