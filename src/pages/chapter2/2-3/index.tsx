import React, { useRef } from "react";

import { useHelloPoint2 } from "./useHelloPoint2";

export function TwoThree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHelloPoint2(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
