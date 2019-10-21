import { useEffect, RefObject } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";

export function useHelloPoint2(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    var gl = getWebGLContext(canvasRef.current as HTMLCanvasElement);

    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }

    const VSHADER_SOURCE = `
      attribute vec4 a_Position;
      void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
      }
    `;

    const FSHADER_SOURCE = `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;

    const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    if (!program) {
      console.log("Failed to initialize shaders.");
      return;
    }

    const a_Position = gl.getAttribLocation(program, "a_Position");

    if (a_Position < 0) {
      console.log("Failed to get the storage location of a_Position");
      return;
    }

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
  }, [canvasRef]);
}
