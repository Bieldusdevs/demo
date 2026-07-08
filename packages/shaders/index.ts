export const wgslFluid = /* wgsl */`
@group(0) @binding(0) var<storage, read_write> vel: array<vec2f>;
@compute @workgroup_size(8,8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  // WebGPU fluid compute – Navier-Stokes lite
}
`

export const glslRaymarch = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz)-t.x,p.y); return length(q)-t.y; }
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*u_res)/u_res.y;
  vec3 ro = vec3(0.,0.,3.5), rd = normalize(vec3(uv,-1.4));
  float d=0.,t=0.;
  for(int i=0;i<96;i++){ vec3 p=ro+rd*t; d=sdTorus(p, vec2(.95,.32)); if(d<.001)break; t+=d; }
  vec3 col = vec3(.08) + .9*exp(-t*.35)*vec3(.55,.3,1.2);
  gl_FragColor = vec4(col,1.);
}
`
