import { useEffect, RefObject } from "react";

export function useDrawingRectangle(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Failed to retrieve the <canvas> element");
      return;
    }
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.fillStyle = "rgba(0,0,255,1.0)";
    ctx.fillRect(120, 10, 150, 150);
  }, [canvasRef]);
}
