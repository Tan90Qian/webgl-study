import { useEffect, RefObject } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";
import { initVertexBuffers } from "../utils";

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_CosB, u_SinB;
  void main() {
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
  }
`;

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const ANGLE = 90;

export function useRotatedTriangle(canvasRef: RefObject<HTMLCanvasElement>) {
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

    var radian = (Math.PI * ANGLE) / 180;
    const cosB = Math.cos(radian);
    const sinB = Math.sin(radian);

    const u_CosB = gl.getUniformLocation(program, "u_CosB");
    const u_SinB = gl.getUniformLocation(program, "u_SinB");

    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
  }, [canvasRef]);
}
