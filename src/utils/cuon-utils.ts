export function getWebGLContext(
  canvas: HTMLCanvasElement,
  options?: WebGLContextAttributes
) {
  return canvas.getContext("webgl", options);
}

export function initShaders(
  gl: WebGLRenderingContext,
  vshader: string,
  fshader: string
) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log("Failed to create program");
    return false;
  }

  gl.useProgram(program);
  gl.isProgram(program);

  return true;
}

function createProgram(
  gl: WebGLRenderingContext,
  vshader: string,
  fshader: string
) {
  // Create shader object
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log("Failed to link program: " + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  // Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log("unable to create shader");
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log("Failed to compile shader: " + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
