import { useEffect, RefObject } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";
import { initVertexBuffers } from "../utils";

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform vec4 u_Translation;
  void main() {
    gl_Position = a_Position + u_Translation;
  }
`;

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const Tx = 0.5,
  Ty = 0.5,
  Tz = 0.0;

export function useTranslatedTriangle(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    var gl = getWebGLContext(canvas) as WebGLRenderingContext;

    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }

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

    const n = initVertexBuffers(gl, a_Position);
    if (n < 0) {
      console.log("Failed to set the positions of the vertices");
      return;
    }

    const u_Translation = gl.getUniformLocation(program, "u_Translation");

    gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
  }, [canvasRef]);
}
