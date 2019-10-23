import React, { useRef } from "react";

import { useTranslatedTriangle } from "./useTranslatedTriangle";

export function ThreeFour() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useTranslatedTriangle(canvasRef);
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400">
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
}
