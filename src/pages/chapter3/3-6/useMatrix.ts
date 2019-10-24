import { useEffect, RefObject } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";
import {
  initVertexBuffers,
  createTranslateMatrix,
  createRotateMatrix,
  createScaleMatrix
} from "../utils";

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrix;
  void main() {
    gl_Position = u_xformMatrix * a_Position;
  }
`;

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const ANGLE = 90;

export function useMatrix(canvasRef: RefObject<HTMLCanvasElement>) {
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

    const xformMatrix = createTranslateMatrix(0.5, 0.5, 0.0);
    // const xformMatrix = createRotateMatrix(90);
    // const xformMatrix = createScaleMatrix(1.0, 1.5, 1.0);

    const u_xformMatrix = gl.getUniformLocation(program, "u_xformMatrix");

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
  }, [canvasRef]);
}
