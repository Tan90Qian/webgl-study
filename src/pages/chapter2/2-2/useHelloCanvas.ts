import { useEffect, RefObject } from "react";

import { getWebGLContext } from "src/utils/cuon-utils";

export function useHelloCanvas(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    var gl = getWebGLContext(canvasRef.current as HTMLCanvasElement);

    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
  }, [canvasRef]);
}
