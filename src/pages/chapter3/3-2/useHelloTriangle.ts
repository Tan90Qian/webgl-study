import { useEffect, useCallback, RefObject } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
`;

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

export function useHelloTriangle(canvasRef: RefObject<HTMLCanvasElement>) {
  const initVertexBuffers = useCallback(
    (gl: WebGLRenderingContext, a_Position: number) => {
      const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
      const n = 3;

      // 创建缓冲区对象
      const vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
      }

      // 将缓冲区对象绑定到目标
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

      // 向缓冲区对象中写入数据
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      // 将缓冲区对象分配给a_Position变量
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

      // 连接a_Position变量与分配给它的缓冲区对象
      gl.enableVertexAttribArray(a_Position);

      return n;
    },
    []
  );

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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
  }, [canvasRef, initVertexBuffers]);
}
