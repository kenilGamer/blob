varying vec2 vUv;
uniform float uTime;
void main() {
  gl_FragColor = vec4(vUv,sin(uTime), 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}