/**
 * The pieces the landscape's shader is built from, from the Kirana site's `pixel-field.tsx`: the
 * full-screen triangle, the fragment precision, the 8 × 8 ordered dither, a colour as the canvas
 * resolves it, and a shader's compile.
 */
export const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

/**
 * The fragment shaders' precision. Desktop GPUs compute every float at full precision, but phone
 * and tablet GPUs honour `mediump`, a 16-bit float that cannot hold a cell's row squared or a
 * pixel coordinate past 2048: the dither and the dissolve then fall apart into solid blocks and
 * stripes. Ask for `highp` wherever the fragment stage has it.
 */
export const PRECISION = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`

/**
 * The 8 × 8 ordered-dither matrix in GLSL, built from the 2 × 2 one without a lookup table. Each
 * level reduces its cell to 0 or 1 first, so the sums stay small at any precision.
 */
/**
 * The 8 × 8 ordered-dither matrix in GLSL, built from the 2 × 2 one without a lookup table. Each
 * level reduces its cell to 0 or 1 first, so the sums stay small at any precision.
 */
export const BAYER = `
float bayer2(vec2 a) { a = mod(floor(a), 2.0); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }
`

/** A colour as the canvas resolves it (`oklch()` and `light-dark()` included), in 0–1 RGB. */
export function rgb(color: string): [number, number, number] {
  const probe = document.createElement("canvas").getContext("2d")
  if (!probe) return [0, 0, 0]
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data
  return [(r ?? 0) / 255, (g ?? 0) / 255, (b ?? 0) / 255]
}

export function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}
