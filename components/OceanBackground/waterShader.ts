export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Editorial water — deep navy gradient with caustic-like flowing patterns
// and a subtle gold shimmer that reads behind glass overlays.
export const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;

  // simplex 2d
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i = 0; i < 5; i++){
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = uTime * 0.06;

    // Two layers of slow-flowing noise → caustic-like ripples
    float n1 = fbm(p * 1.6 + vec2(t,  t*0.8));
    float n2 = fbm(p * 3.0 - vec2(t*0.6, -t*0.4) + n1*0.5);
    float caustic = pow(0.5 + 0.5 * n2, 2.2);

    // Vertical depth gradient (deeper towards top)
    float depth = smoothstep(0.0, 1.0, 1.0 - uv.y);

    // Palette
    vec3 cAbyss = vec3(0.020, 0.043, 0.085); // #050b16
    vec3 cDeep  = vec3(0.039, 0.078, 0.149); // #0a1426
    vec3 cSea   = vec3(0.059, 0.137, 0.251); // #0f2340
    vec3 cTide  = vec3(0.110, 0.227, 0.369); // #1c3a5e
    vec3 cGold  = vec3(0.847, 0.643, 0.290); // #d8a44a

    vec3 col = mix(cAbyss, cDeep, depth);
    col = mix(col, cSea,  smoothstep(0.0, 0.7, caustic) * 0.55);
    col = mix(col, cTide, smoothstep(0.55, 1.0, caustic) * 0.35);

    // Subtle gold shimmer along caustic peaks
    float peak = smoothstep(0.78, 0.95, caustic);
    col += cGold * peak * 0.18;

    // Mouse-reactive light source (very subtle)
    vec2 m = (uMouse - 0.5) * aspect;
    float md = distance(p, m);
    col += cGold * 0.04 * smoothstep(0.6, 0.0, md);

    // Edge vignette
    float vig = smoothstep(1.2, 0.35, length(p));
    col *= mix(0.6, 1.0, vig);

    // Grain
    float grain = (fract(sin(dot(uv * uResolution, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;
