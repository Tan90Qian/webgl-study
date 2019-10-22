import React, { useRef } from "react";

import { useMultiPoint } from "./useMultiPoint";

export function ThreeOne() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMultiPoint(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
