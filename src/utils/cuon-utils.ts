export function getWebGLContext(
  canvas: HTMLCanvasElement,
  options?: WebGLContextAttributes
) {
  return canvas.getContext("webgl", options);
}
