!function n(e,t,o){function i(a,s){if(!t[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(r)return r(a,!0);var v=new Error("Cannot find module '"+a+"'");throw v.code="MODULE_NOT_FOUND",v}var l=t[a]={exports:{}};e[a][0].call(l.exports,function(n){var t=e[a][1][n];return i(t||n)},l,l.exports,n,e,t,o)}return t[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(n,e,t){"use strict";function o(){function n(){e=window.innerWidth,t=window.innerHeight,r&&(r.setSize(e,t),r.setViewport(0,0,e,t),s.aspect=e/t,s.updateProjectionMatrix())}var e,t;e=window.innerWidth,t=window.innerHeight;var o=Math.min(1.5,window.devicePixelRatio),r=new THREE.WebGLRenderer({canvas:document.getElementById("canvas"),antialias:!0});r.setClearColor(2236962,1),r.setSize(e,t),r.setPixelRatio(o);var a=new THREE.Scene,s=new THREE.PerspectiveCamera(75,e/t,.01,1e3);s.position.set(0,0,5),s.lookAt(new THREE.Vector3);var c=new i(s);return window.addEventListener("resize",n),{renderer:r,scene:a,controls:c,camera:s}}var i=n("three-orbit-controls")(THREE);e.exports=o},{"three-orbit-controls":4}],2:[function(n,e,t){"use strict";function o(){z+=8e-4,z>6.28&&(z-=6.28),u.time.value+=.01,u.scrollPer.value=b,y.time.value+=.01,f.rotation.z=5*Math.sin(z),f.rotation.x=5*Math.sin(3*z),f.position.y=.14*Math.sin(3*z),f.position.x=.1*Math.cos(4*z),h.rotation.z=5*Math.sin(z),h.rotation.x=5*Math.sin(3*z),h.position.y=.14*Math.sin(3*z),requestAnimationFrame(o),c.render(s,a)}var i=n("./lib/createThree"),r=i(),a=r.camera,s=r.scene,c=r.renderer,v=(r.controls,n("glslify")),l=v(["precision highp float;\n#define GLSLIFY 1\n\n/**\n * Set the colour to a lovely pink.\n * Note that the color is a 4D Float\n * Vector, R,G,B and A and each part\n * runs from 0.0 to 1.0\n */\n\nuniform sampler2D texture1;\n\nvarying vec2 vUv;\nuniform float time;\n\nuniform sampler2D tMatCap;\nuniform sampler2D tMatCap2;\nvarying vec3 vNormal;\nvarying vec3 vPostion;\nvarying mat4 vModelViewMatrix;\nvarying mat3 vNormalMatrix;\n\nuniform float scrollPer;\n\nvarying vec2 vN2;\nvarying vec3 e;\nvarying vec3 n;\n\nvoid main() {\n\n  vec2 vUv2 = vUv + vec2(time*0.3,time*0.3);\n//  vec2 vUv2 = vUv + vec2(0.0,time*0.1);\n//  vec2 vUv2 = vUv + vec2(time*0.3,time*0.3);\n  vec4 color = texture2D( texture1, vUv2 );\n//\n//  if( color.x <= 0.9 )discard;\n\n  vNormalMatrix;\n  vNormal;\n  vUv;\n\n//  gl_FragColor = vec4( vNormal, 1. );\n\n  vec4 p = vec4( vPostion * color.xyz, 1. );\n  vec3 e = normalize( vec3( vModelViewMatrix * p ) );\n\n/*\n\n  // calc in fragment shader -> it becomes only Flat shading\n\n  vec3 dx = dFdx(p.xyz);\n  vec3 dy = dFdy(p.xyz);\n  vec3 fnormal = normalize(cross(normalize(dx), normalize(dy)));\n  vec3 n = normalize( vNormalMatrix * fnormal );\n\n*/\n\n  vec3 n = normalize( vNormal );\n\n  vec3 r = reflect( e, n );\n  float m = 2. * sqrt(\n    pow( r.x, 2. ) +\n    pow( r.y, 2. ) +\n    pow( r.z + 1., 2. )\n  );\n  vec2 vN = r.xy / m + .5;\n\n  vec3 base;\n\n//  if( sin(time) >= vPostion.y ){\n//   base = texture2D( tMatCap2, vN ).rgb;\n////  }else{\n//   base = texture2D( tMatCap, vN ).rgb;\n//  }\n\n//  base = texture2D( tMatCap, vN ).rgb * texture2D( tMatCap2, vN ).rgb * color.xyz;\n  base = texture2D( tMatCap2, vN ).rgb * color.xyz;\n\n  gl_FragColor = vec4( base, 1. );\n\n// debug\n//  gl_FragColor = vec4(normalize(vNormal),1.0);\n//  gl_FragColor = vec4(vNormalMatrix * fnormal,1.0);\n\n//  gl_FragColor = color;\n//  gl_FragColor = vec4(color.xyz + (1.-(vNormal*10.0)), 1.0);\n//  gl_FragColor = vec4(vUv.x,  // R\n//                      vUv.y,  // G\n//                      0.8,  // B\n//                      1.0); // A\n}"]),m=v(['#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_0(vec4 x) {\n     return mod289_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_0(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_0(i);\n  vec4 p = permute_0( permute_0( permute_0(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_0(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1(vec4 x)\n{\n  return mod289_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289_1(Pi0);\n  Pi1 = mod289_1(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_1(permute_1(ix) + iy);\n  vec4 ixy0 = permute_1(ixy + iz0);\n  vec4 ixy1 = permute_1(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_1(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_1(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n/**\n * Multiply each vertex by the\n * model-view matrix and the\n * projection matrix (both provided\n * by Three.js) to get a final\n * vertex position\n */\n\n#define PI 3.1415;\n\nuniform float time;\nuniform float scrollPer;\n\nvarying vec2 vUv;\n\nvarying vec3 vNormal;\nvarying vec3 vPostion;\nvarying mat4 vModelViewMatrix;\nvarying mat3 vNormalMatrix;\n\nvec3 sample(float t, float time) {\n  float angle = t * time * 2.0 * PI;\n  vec2 rot = vec2(cos(angle), sin(angle));\n  float z = t * 2.0 - 1.0;\n  return vec3(rot, z);\n}\n\nvec3 makeNose(vec3 pos){\n//  return  (pos);\n//  return  (pos) + cnoise3((pos*sin(time)))*0.3;\n//  if( pos.y >= scrollPer*2.0-1.0 )return pos;\n\n//  vec3 aaa = (pos) + (cnoise3((pos)*1.0 + time*0.8 )*0.4);// - sample(sin(position.y), sin(time) )*0.3 - vec3(0.0, yy, 0.0)*0.2 ) * yy;;\n//  if( aaa.y >= scrollPer*2.0-1.0 )return pos + ( normal * snoise3(pos + time*0.2 ) * 0.1);\n\n  //float yy = (0.0-pos.y);\n\n//  return pos + ( normal * 4.0 * snoise3(pos + time*0.4) * 0.3);\n//  return pos + ( normal * 2.0 * snoise3(pos * sin(time)) * 0.2) * (1.0 + sample(sin(position.z),sin(time)));\n//  return pos + (sample(position.z,sin(time) + 2.0)-1.0)*2.0;\n  return pos + ( normal * 2.0 * snoise(pos * (sin(time)+1.0)) * 0.2);// * (sample(position.z,sin(time) + 2.0)-1.0);\n\n//  return aaa;\n}\n\nvec3 getNeighbour(vec3 orig, float offsetT, float offsetP){\n\n  // xyz -> Spherical coordinates\n  float r = sqrt(orig.x*orig.x + orig.y*orig.y + orig.z*orig.z);\n  float theta = acos(orig.z/r);\n  float sgn = (orig.y>=0.?1.:-1.);\n  float phi = sgn * acos(orig.x/sqrt(orig.x*orig.x + orig.y*orig.y));\n\n  // add offset\n  theta += offsetT;\n  phi += offsetP;\n\n  // Spherical coordinates -> xyz\n  float x = r * sin(theta) * cos(phi);\n  float y = r * sin(theta) * sin(phi);\n  float z = r * cos(theta);\n\n  return vec3( x, y, z );\n  \n}\n\nvoid main() {\n\n  vUv = uv;\n//  vec3 pos = position + sample(position.z, sin(time) * 2.0) + position * snoise3(position * 0.5 + sin(time));\n//  vec3 pos = position + sample(position.x, sin(time) * 2.0 * tan(time)) * position * snoise3(position * 0.5 + sin(time));\n//  vec3 pos = position + sample(position.x, sin(time) ) * position * snoise3(position * 0.5 + sin(time)*0.1);\n\n//  vec3 pos = position + sample(position.z, sin(time*0.4) ) * ( normal * snoise3(position*1.0 + time*0.08 ));// + sample(position.x, sin(time) ) * position * snoise3(position * 0.5 + sin(time)*0.1);\n//  vec3 pos = position + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3);// + sample(position.z*position.x*position.y, sin(time) )*0.4;\n//  vec3 pos = position + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3) + sample(position.z, 1.0 )*1.0;\n//  vec3 pos = position + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3);\n//  vec3 pos = position;// + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3);// + sample(position.z*position.x*position.y, sin(time) )*0.4;\n\n  float dx = 0.001;\n  vec3 pos = makeNose( position + vec3(dx) );\n\n  // calculating two other positions with a small offset, then get the cross product.\n  // ref.) https://www.opengl.org/discussion_boards/showthread.php/165885-Question-about-calculating-vertex-normals?p=1173292&viewfull=1#post1173292\n  float gridOffset\t= 0.1;\n  vec3 neighbour1\t= makeNose(getNeighbour(position+vec3(dx)/*for specfic point(0,0,0)*/, gridOffset, 0.        ));\n  vec3 neighbour2\t= makeNose(getNeighbour(position+vec3(dx)/*for specfic point(0,0,0)*/, 0.        , gridOffset));\n\n  vec3 tangent\t= neighbour1 - pos;\n  vec3 bitangent= neighbour2 - pos;\n\n  vec3 norm\t= cross(normalize(tangent), normalize(bitangent));\n\tnorm\t\t= normalize(norm);\n\tnorm\t\t= normalMatrix * norm;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);\n\n//  vPostion = vec4(modelViewMatrix * vec4(pos,1.0)).xyz;\n  vPostion =  pos;\n\n  vNormal = norm;\n  vModelViewMatrix = modelViewMatrix;\n  vNormalMatrix = normalMatrix;\n\n}']),p=v(["precision highp float;\n#define GLSLIFY 1\n\n/**\n * Set the colour to a lovely pink.\n * Note that the color is a 4D Float\n * Vector, R,G,B and A and each part\n * runs from 0.0 to 1.0\n */\n\nuniform sampler2D texture1;\n\nvarying vec2 vUv;\nuniform float time;\n\nuniform sampler2D tMatCap;\nuniform sampler2D tMatCap2;\nvarying vec3 vNormal;\nvarying vec3 vPostion;\nvarying mat4 vModelViewMatrix;\nvarying mat3 vNormalMatrix;\n\nuniform float scrollPer;\n\nvarying vec2 vN2;\nvarying vec3 e;\nvarying vec3 n;\n\nvoid main() {\n\n  vec2 vUv2 = vUv + vec2(time*0.3,time*0.3);\n//  vec2 vUv2 = vUv + vec2(0.0,time*0.1);\n//  vec2 vUv2 = vUv + vec2(time*0.3,time*0.3);\n  vec4 color = texture2D( texture1, vUv2 );\n//\n  if( color.x <= 0.9 )discard;\n\n  vNormalMatrix;\n  vNormal;\n  vUv;\n\n//  gl_FragColor = vec4( vNormal, 1. );\n\n  vec4 p = vec4( vPostion * color.xyz, 1. );\n  vec3 e = normalize( vec3( vModelViewMatrix * p ) );\n\n/*\n\n  // calc in fragment shader -> it becomes only Flat shading\n\n  vec3 dx = dFdx(p.xyz);\n  vec3 dy = dFdy(p.xyz);\n  vec3 fnormal = normalize(cross(normalize(dx), normalize(dy)));\n  vec3 n = normalize( vNormalMatrix * fnormal );\n\n*/\n\n  vec3 n = normalize( vNormal );\n\n  vec3 r = reflect( e, n );\n  float m = 2. * sqrt(\n    pow( r.x, 2. ) +\n    pow( r.y, 2. ) +\n    pow( r.z + 1., 2. )\n  );\n  vec2 vN = r.xy / m + .5;\n\n  vec3 base;\n\n//  if( sin(time) >= vPostion.y ){\n//   base = texture2D( tMatCap2, vN ).rgb;\n////  }else{\n//   base = texture2D( tMatCap, vN ).rgb;\n//  }\n\n//  base = texture2D( tMatCap, vN ).rgb * texture2D( tMatCap2, vN ).rgb * color.xyz;\n  base = texture2D( tMatCap, vN ).rgb * texture2D( tMatCap2, vN ).rgb * color.xyz;\n//  base = texture2D( tMatCap2, vN ).rgb * color.xyz;\n\n  gl_FragColor = vec4( base, 1. );\n\n// debug\n//  gl_FragColor = vec4(normalize(vNormal),1.0);\n//  gl_FragColor = vec4(vNormalMatrix * fnormal,1.0);\n\n//  gl_FragColor = color;\n//  gl_FragColor = vec4(color.xyz + (1.-(vNormal*10.0)), 1.0);\n//  gl_FragColor = vec4(vUv.x,  // R\n//                      vUv.y,  // G\n//                      0.8,  // B\n//                      1.0); // A\n}"]),x=v(['#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_0(vec4 x) {\n     return mod289_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_0(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_0(i);\n  vec4 p = permute_0( permute_0( permute_0(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_0(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1(vec4 x)\n{\n  return mod289_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289_1(Pi0);\n  Pi1 = mod289_1(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_1(permute_1(ix) + iy);\n  vec4 ixy0 = permute_1(ixy + iz0);\n  vec4 ixy1 = permute_1(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_1(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_1(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n/**\n * Multiply each vertex by the\n * model-view matrix and the\n * projection matrix (both provided\n * by Three.js) to get a final\n * vertex position\n */\n\n#define PI 3.1415;\n\nuniform float time;\nuniform float scrollPer;\n\nvarying vec2 vUv;\n\nvarying vec3 vNormal;\nvarying vec3 vPostion;\nvarying mat4 vModelViewMatrix;\nvarying mat3 vNormalMatrix;\n\nvec3 sample(float t, float time) {\n  float angle = t * time * 2.0 * PI;\n  vec2 rot = vec2(cos(angle), sin(angle));\n  float z = t * 2.0 - 1.0;\n  return vec3(rot, z);\n}\n\nvec3 makeNose(vec3 pos){\n//  return  (pos);\n//  return  (pos) + cnoise3((pos*sin(time)))*0.3;\n//  if( pos.y >= scrollPer*2.0-1.0 )return pos;\n\n//  vec3 aaa = (pos) + (cnoise3((pos)*1.0 + time*0.8 )*0.4);// - sample(sin(position.y), sin(time) )*0.3 - vec3(0.0, yy, 0.0)*0.2 ) * yy;;\n//  if( aaa.y >= scrollPer*2.0-1.0 )return pos + ( normal * snoise3(pos + time*0.2 ) * 0.1);\n\n  //float yy = (0.0-pos.y);\n\n//  return pos + ( normal * 4.0 * snoise3(pos + time*0.4) * 0.3);\n//  return pos + ( normal * 2.0 * snoise3(pos * sin(time)) * 0.2) * (1.0 + sample(sin(position.z),sin(time)));\n//  return pos + (sample(position.z,sin(time) + 2.0)-1.0)*2.0;\n  return pos + ( normal * 2.0 * snoise(pos * (sin(time)+1.0)) * 0.2);// * (sample(position.z,sin(time) + 2.0)-1.0);\n\n//  return aaa;\n}\n\nvec3 getNeighbour(vec3 orig, float offsetT, float offsetP){\n\n  // xyz -> Spherical coordinates\n  float r = sqrt(orig.x*orig.x + orig.y*orig.y + orig.z*orig.z);\n  float theta = acos(orig.z/r);\n  float sgn = (orig.y>=0.?1.:-1.);\n  float phi = sgn * acos(orig.x/sqrt(orig.x*orig.x + orig.y*orig.y));\n\n  // add offset\n  theta += offsetT;\n  phi += offsetP;\n\n  // Spherical coordinates -> xyz\n  float x = r * sin(theta) * cos(phi);\n  float y = r * sin(theta) * sin(phi);\n  float z = r * cos(theta);\n\n  return vec3( x, y, z );\n  \n}\n\nvoid main() {\n\n  vUv = uv;\n//  vec3 pos = position + sample(position.z, sin(time) * 2.0) + position * snoise3(position * 0.5 + sin(time));\n//  vec3 pos = position + sample(position.x, sin(time) * 2.0 * tan(time)) * position * snoise3(position * 0.5 + sin(time));\n//  vec3 pos = position + sample(position.x, sin(time) ) * position * snoise3(position * 0.5 + sin(time)*0.1);\n\n//  vec3 pos = position + sample(position.z, sin(time*0.4) ) * ( normal * snoise3(position*1.0 + time*0.08 ));// + sample(position.x, sin(time) ) * position * snoise3(position * 0.5 + sin(time)*0.1);\n//  vec3 pos = position + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3);// + sample(position.z*position.x*position.y, sin(time) )*0.4;\n//  vec3 pos = position + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3) + sample(position.z, 1.0 )*1.0;\n//  vec3 pos = position + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3);\n//  vec3 pos = position;// + ( normal * snoise3(position * vec3(1.01,1.01,1.01) + time*0.8 ) * 0.3);// + sample(position.z*position.x*position.y, sin(time) )*0.4;\n\n  float dx = 0.001;\n  vec3 pos = makeNose( position + vec3(dx) );\n\n  // calculating two other positions with a small offset, then get the cross product.\n  // ref.) https://www.opengl.org/discussion_boards/showthread.php/165885-Question-about-calculating-vertex-normals?p=1173292&viewfull=1#post1173292\n  float gridOffset\t= 0.1;\n  vec3 neighbour1\t= makeNose(getNeighbour(position+vec3(dx)/*for specfic point(0,0,0)*/, gridOffset, 0.        ));\n  vec3 neighbour2\t= makeNose(getNeighbour(position+vec3(dx)/*for specfic point(0,0,0)*/, 0.        , gridOffset));\n\n  vec3 tangent\t= neighbour1 - pos;\n  vec3 bitangent= neighbour2 - pos;\n\n  vec3 norm\t= cross(normalize(tangent), normalize(bitangent));\n\tnorm\t\t= normalize(norm);\n\tnorm\t\t= normalMatrix * norm;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);\n\n//  vPostion = vec4(modelViewMatrix * vec4(pos,1.0)).xyz;\n  vPostion =  pos;\n\n  vNormal = norm;\n  vModelViewMatrix = modelViewMatrix;\n  vNormalMatrix = normalMatrix;\n\n}']),g=new THREE.IcosahedronGeometry(1,5),d=new THREE.TextureLoader,u={},y={},f=void 0,h=void 0;d.load("img/border1.png",function(n){n.wrapS=n.wrapT=THREE.RepeatWrapping,u={time:{type:"f",value:0},scrollPer:{type:"f",value:0},texture1:{type:"t",value:n},tMatCap:{type:"t",value:THREE.ImageUtils.loadTexture("img/rubber_black.png")},tMatCap2:{type:"t",value:THREE.ImageUtils.loadTexture("img/nature_ice_furnace.png")}},y={time:{type:"f",value:0},scrollPer:{type:"f",value:0},texture1:{type:"t",value:n},tMatCap:{type:"t",value:THREE.ImageUtils.loadTexture("img/rubber_black.png")},tMatCap2:{type:"t",value:THREE.ImageUtils.loadTexture("img/nature_ice_furnace.png")}};var e=new THREE.ShaderMaterial({uniforms:u,vertexShader:m,fragmentShader:l,transparent:!0,side:THREE.DoubleSide}),t=new THREE.ShaderMaterial({uniforms:y,vertexShader:x,fragmentShader:p,transparent:!0,side:THREE.DoubleSide});e.extensions.derivatives=!0,e.extensions.drawBuffers=!0,f=new THREE.Mesh(g,e),s.add(f),h=new THREE.Mesh(g,t),h.scale.x=1.4,h.scale.y=1.4,h.scale.z=1.4,s.add(h),o()},function(n){console.log(n.loaded/n.total*100+"% loaded")},function(n){console.log("An error happened")});var z=0,b=0;$(window).scroll(function(){b=$(window).scrollTop()/$(window).height()})},{"./lib/createThree":1,glslify:3}],3:[function(n,e,t){e.exports=function(n){"string"==typeof n&&(n=[n]);for(var e=[].slice.call(arguments,1),t=[],o=0;o<n.length-1;o++)t.push(n[o],e[o]||"");return t.push(n[o]),t.join("")}},{}],4:[function(n,e,t){e.exports=function(n){function e(e,t){function o(){return 2*Math.PI/60/60*L.autoRotateSpeed}function i(){return Math.pow(.95,L.zoomSpeed)}function r(n){k.theta-=n}function a(n){k.phi-=n}function s(e){L.object instanceof n.PerspectiveCamera?q/=e:L.object instanceof n.OrthographicCamera?(L.object.zoom=Math.max(L.minZoom,Math.min(L.maxZoom,L.object.zoom*e)),L.object.updateProjectionMatrix(),Y=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),L.enableZoom=!1)}function c(e){L.object instanceof n.PerspectiveCamera?q*=e:L.object instanceof n.OrthographicCamera?(L.object.zoom=Math.max(L.minZoom,Math.min(L.maxZoom,L.object.zoom/e)),L.object.updateProjectionMatrix(),Y=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),L.enableZoom=!1)}function v(n){Z.set(n.clientX,n.clientY)}function l(n){$.set(n.clientX,n.clientY)}function m(n){W.set(n.clientX,n.clientY)}function p(n){B.set(n.clientX,n.clientY),X.subVectors(B,Z);var e=L.domElement===document?L.domElement.body:L.domElement;r(2*Math.PI*X.x/e.clientWidth*L.rotateSpeed),a(2*Math.PI*X.y/e.clientHeight*L.rotateSpeed),Z.copy(B),L.update()}function x(n){J.set(n.clientX,n.clientY),nn.subVectors(J,$),nn.y>0?s(i()):nn.y<0&&c(i()),$.copy(J),L.update()}function g(n){K.set(n.clientX,n.clientY),Q.subVectors(K,W),on(Q.x,Q.y),W.copy(K),L.update()}function d(n){}function u(n){n.deltaY<0?c(i()):n.deltaY>0&&s(i()),L.update()}function y(n){switch(n.keyCode){case L.keys.UP:on(0,L.keyPanSpeed),L.update();break;case L.keys.BOTTOM:on(0,-L.keyPanSpeed),L.update();break;case L.keys.LEFT:on(L.keyPanSpeed,0),L.update();break;case L.keys.RIGHT:on(-L.keyPanSpeed,0),L.update()}}function f(n){Z.set(n.touches[0].pageX,n.touches[0].pageY)}function h(n){var e=n.touches[0].pageX-n.touches[1].pageX,t=n.touches[0].pageY-n.touches[1].pageY,o=Math.sqrt(e*e+t*t);$.set(0,o)}function z(n){W.set(n.touches[0].pageX,n.touches[0].pageY)}function b(n){B.set(n.touches[0].pageX,n.touches[0].pageY),X.subVectors(B,Z);var e=L.domElement===document?L.domElement.body:L.domElement;r(2*Math.PI*X.x/e.clientWidth*L.rotateSpeed),a(2*Math.PI*X.y/e.clientHeight*L.rotateSpeed),Z.copy(B),L.update()}function w(n){var e=n.touches[0].pageX-n.touches[1].pageX,t=n.touches[0].pageY-n.touches[1].pageY,o=Math.sqrt(e*e+t*t);J.set(0,o),nn.subVectors(J,$),nn.y>0?c(i()):nn.y<0&&s(i()),$.copy(J),L.update()}function P(n){K.set(n.touches[0].pageX,n.touches[0].pageY),Q.subVectors(K,W),on(Q.x,Q.y),W.copy(K),L.update()}function E(n){}function M(n){if(!1!==L.enabled){if(n.preventDefault(),n.button===L.mouseButtons.ORBIT){if(!1===L.enableRotate)return;v(n),F=I.ROTATE}else if(n.button===L.mouseButtons.ZOOM){if(!1===L.enableZoom)return;l(n),F=I.DOLLY}else if(n.button===L.mouseButtons.PAN){if(!1===L.enablePan)return;m(n),F=I.PAN}F!==I.NONE&&(document.addEventListener("mousemove",_,!1),document.addEventListener("mouseup",C,!1),L.dispatchEvent(A))}}function _(n){if(!1!==L.enabled)if(n.preventDefault(),F===I.ROTATE){if(!1===L.enableRotate)return;p(n)}else if(F===I.DOLLY){if(!1===L.enableZoom)return;x(n)}else if(F===I.PAN){if(!1===L.enablePan)return;g(n)}}function C(n){!1!==L.enabled&&(d(n),document.removeEventListener("mousemove",_,!1),document.removeEventListener("mouseup",C,!1),L.dispatchEvent(U),F=I.NONE)}function N(n){!1===L.enabled||!1===L.enableZoom||F!==I.NONE&&F!==I.ROTATE||(n.preventDefault(),n.stopPropagation(),u(n),L.dispatchEvent(A),L.dispatchEvent(U))}function T(n){!1!==L.enabled&&!1!==L.enableKeys&&!1!==L.enablePan&&y(n)}function O(n){if(!1!==L.enabled){switch(n.touches.length){case 1:if(!1===L.enableRotate)return;f(n),F=I.TOUCH_ROTATE;break;case 2:if(!1===L.enableZoom)return;h(n),F=I.TOUCH_DOLLY;break;case 3:if(!1===L.enablePan)return;z(n),F=I.TOUCH_PAN;break;default:F=I.NONE}F!==I.NONE&&L.dispatchEvent(A)}}function D(n){if(!1!==L.enabled)switch(n.preventDefault(),n.stopPropagation(),n.touches.length){case 1:if(!1===L.enableRotate)return
;if(F!==I.TOUCH_ROTATE)return;b(n);break;case 2:if(!1===L.enableZoom)return;if(F!==I.TOUCH_DOLLY)return;w(n);break;case 3:if(!1===L.enablePan)return;if(F!==I.TOUCH_PAN)return;P(n);break;default:F=I.NONE}}function S(n){!1!==L.enabled&&(E(n),L.dispatchEvent(U),F=I.NONE)}function R(n){n.preventDefault()}this.object=e,this.domElement=void 0!==t?t:document,this.enabled=!0,this.target=new n.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.25,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={ORBIT:n.MOUSE.LEFT,ZOOM:n.MOUSE.MIDDLE,PAN:n.MOUSE.RIGHT},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return V.phi},this.getAzimuthalAngle=function(){return V.theta},this.reset=function(){L.target.copy(L.target0),L.object.position.copy(L.position0),L.object.zoom=L.zoom0,L.object.updateProjectionMatrix(),L.dispatchEvent(j),L.update(),F=I.NONE},this.update=function(){var t=new n.Vector3,i=(new n.Quaternion).setFromUnitVectors(e.up,new n.Vector3(0,1,0)),a=i.clone().inverse(),s=new n.Vector3,c=new n.Quaternion;return function(){var n=L.object.position;return t.copy(n).sub(L.target),t.applyQuaternion(i),V.setFromVector3(t),L.autoRotate&&F===I.NONE&&r(o()),V.theta+=k.theta,V.phi+=k.phi,V.theta=Math.max(L.minAzimuthAngle,Math.min(L.maxAzimuthAngle,V.theta)),V.phi=Math.max(L.minPolarAngle,Math.min(L.maxPolarAngle,V.phi)),V.makeSafe(),V.radius*=q,V.radius=Math.max(L.minDistance,Math.min(L.maxDistance,V.radius)),L.target.add(G),t.setFromSpherical(V),t.applyQuaternion(a),n.copy(L.target).add(t),L.object.lookAt(L.target),!0===L.enableDamping?(k.theta*=1-L.dampingFactor,k.phi*=1-L.dampingFactor):k.set(0,0,0),q=1,G.set(0,0,0),!!(Y||s.distanceToSquared(L.object.position)>H||8*(1-c.dot(L.object.quaternion))>H)&&(L.dispatchEvent(j),s.copy(L.object.position),c.copy(L.object.quaternion),Y=!1,!0)}}(),this.dispose=function(){L.domElement.removeEventListener("contextmenu",R,!1),L.domElement.removeEventListener("mousedown",M,!1),L.domElement.removeEventListener("wheel",N,!1),L.domElement.removeEventListener("touchstart",O,!1),L.domElement.removeEventListener("touchend",S,!1),L.domElement.removeEventListener("touchmove",D,!1),document.removeEventListener("mousemove",_,!1),document.removeEventListener("mouseup",C,!1),window.removeEventListener("keydown",T,!1)};var L=this,j={type:"change"},A={type:"start"},U={type:"end"},I={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_DOLLY:4,TOUCH_PAN:5},F=I.NONE,H=1e-6,V=new n.Spherical,k=new n.Spherical,q=1,G=new n.Vector3,Y=!1,Z=new n.Vector2,B=new n.Vector2,X=new n.Vector2,W=new n.Vector2,K=new n.Vector2,Q=new n.Vector2,$=new n.Vector2,J=new n.Vector2,nn=new n.Vector2,en=function(){var e=new n.Vector3;return function(n,t){e.setFromMatrixColumn(t,0),e.multiplyScalar(-n),G.add(e)}}(),tn=function(){var e=new n.Vector3;return function(n,t){e.setFromMatrixColumn(t,1),e.multiplyScalar(n),G.add(e)}}(),on=function(){var e=new n.Vector3;return function(t,o){var i=L.domElement===document?L.domElement.body:L.domElement;if(L.object instanceof n.PerspectiveCamera){var r=L.object.position;e.copy(r).sub(L.target);var a=e.length();a*=Math.tan(L.object.fov/2*Math.PI/180),en(2*t*a/i.clientHeight,L.object.matrix),tn(2*o*a/i.clientHeight,L.object.matrix)}else L.object instanceof n.OrthographicCamera?(en(t*(L.object.right-L.object.left)/L.object.zoom/i.clientWidth,L.object.matrix),tn(o*(L.object.top-L.object.bottom)/L.object.zoom/i.clientHeight,L.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),L.enablePan=!1)}}();L.domElement.addEventListener("contextmenu",R,!1),L.domElement.addEventListener("mousedown",M,!1),L.domElement.addEventListener("wheel",N,!1),L.domElement.addEventListener("touchstart",O,!1),L.domElement.addEventListener("touchend",S,!1),L.domElement.addEventListener("touchmove",D,!1),window.addEventListener("keydown",T,!1),this.update()}return e.prototype=Object.create(n.EventDispatcher.prototype),e.prototype.constructor=e,Object.defineProperties(e.prototype,{center:{get:function(){return console.warn("THREE.OrbitControls: .center has been renamed to .target"),this.target}},noZoom:{get:function(){return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),!this.enableZoom},set:function(n){console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),this.enableZoom=!n}},noRotate:{get:function(){return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),!this.enableRotate},set:function(n){console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),this.enableRotate=!n}},noPan:{get:function(){return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),!this.enablePan},set:function(n){console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),this.enablePan=!n}},noKeys:{get:function(){return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),!this.enableKeys},set:function(n){console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),this.enableKeys=!n}},staticMoving:{get:function(){return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),!this.enableDamping},set:function(n){console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),this.enableDamping=!n}},dynamicDampingFactor:{get:function(){return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor},set:function(n){console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor=n}}}),e}},{}]},{},[2]);