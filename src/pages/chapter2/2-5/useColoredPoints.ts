import { useEffect, useCallback, RefObject, useRef } from "react";

import { getWebGLContext, initShaders } from "src/utils/cuon-utils";

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;


type POINT = [number, number]
type RGBA = [number, number, number, number];

export function useColoredPoints(canvasRef: RefObject<HTMLCanvasElement>) {
  const gPointsRef = useRef([] as POINT[]);
  const gColorsRef = useRef([] as RGBA[]);

  const click = useCallback(
    function click(
      ev: MouseEvent,
      gl: WebGLRenderingContext,
      canvas: HTMLCanvasElement,
      a_Position: number,
      u_FragColor: WebGLUniformLocation
    ) {
      let x = ev.clientX;
      let y = ev.clientY;
      const rect = (ev.target as HTMLCanvasElement).getBoundingClientRect();

      x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
      y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

      gPointsRef.current.push([x, y]);

      if (x >= 0.0 && y >= 0.0) {
        gColorsRef.current.push([1.0, 0.0, 0.0, 1.0]);
      } else if (x < 0.0 && y < 0.0) {
        gColorsRef.current.push([0.0, 1.0, 0.0, 1.0]);
      } else {
        gColorsRef.current.push([1.0, 1.0, 1.0, 1.0]);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);

      var len = gPointsRef.current.length;

      for (let i = 0; i < len; i += 1) {
        const [x, y] = gPointsRef.current[i];
        const rgba = gColorsRef.current[i]; 
        gl.vertexAttrib3f(a_Position, x, y, 0.0);
        gl.uniform4f(u_FragColor, ...rgba)
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

    const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    if (!program) {
      console.log("Failed to initialize shaders.");
      return;
    }

    const a_Position = gl.getAttribLocation(program, "a_Position");

    const u_FragColor = gl.getUniformLocation(
      program,
      "u_FragColor"
    ) as WebGLUniformLocation;

    canvas.addEventListener("mousedown", ev => {
      click(ev, gl, canvas, a_Position, u_FragColor);
    });

    if (a_Position < 0) {
      console.log("Failed to get the storage location of a_Position");
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, [canvasRef, click]);
}
