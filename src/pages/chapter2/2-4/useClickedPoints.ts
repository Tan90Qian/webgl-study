import { useEffect, useCallback, RefObject, useRef } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";

export function useClickedPoints(canvasRef: RefObject<HTMLCanvasElement>) {
  const gPointsRef = useRef([] as number[]);

  const click = useCallback(
    function click(
      ev: MouseEvent,
      gl: WebGLRenderingContext,
      canvas: HTMLCanvasElement,
      a_Position: number
    ) {
      let x = ev.clientX;
      let y = ev.clientY;
      const rect = (ev.target as HTMLCanvasElement).getBoundingClientRect();

      x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
      y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

      gPointsRef.current.push(x);
      gPointsRef.current.push(y);
      gl.clear(gl.COLOR_BUFFER_BIT);

      var len = gPointsRef.current.length;

      for (let i = 0; i < len; i += 2) {
        gl.vertexAttrib3f(
          a_Position,
          gPointsRef.current[i],
          gPointsRef.current[i + 1],
          0.0
        );
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    },
    [gPointsRef]
  );

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    var gl = getWebGLContext(canvas) as WebGLRenderingContext;

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

    canvas.addEventListener("mousedown", ev => {
      click(ev, gl, canvas, a_Position);
    });

    if (a_Position < 0) {
      console.log("Failed to get the storage location of a_Position");
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, [canvasRef, click]);
}
