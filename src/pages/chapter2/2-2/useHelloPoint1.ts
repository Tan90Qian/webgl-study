import { useEffect, RefObject } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";

export function useHelloPoint1(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    var gl = getWebGLContext(canvasRef.current as HTMLCanvasElement);

    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }

    const VSHADER_SOURCE = `
      void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
      }
    `;

    const FSHADER_SOURCE = `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log("Failed to initialize shaders.");
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
  }, [canvasRef]);
}
