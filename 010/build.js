!function e(t,n,o){function a(i,c){if(!n[i]){if(!t[i]){var s="function"==typeof require&&require;if(!c&&s)return s(i,!0);if(r)return r(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return a(n?n:e)},l,l.exports,e,t,n,o)}return n[i].exports}for(var r="function"==typeof require&&require,i=0;i<o.length;i++)a(o[i]);return a}({1:[function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(){o(this,e)}return a(e,[{key:"multiLoad",value:function(e,t){function n(){o++,o>=e.length&&t()}for(var o=0,a=0;a<e.length;a++)e[a](n)}},{key:"scriptLoad",value:function(e,t){var n=document.createElement("script");n.type="text/javascript",n.src=e;var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o),n.onload=t}}]),e}();n.LoadingUtil=r},{}],2:[function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0}),n.SoundCloud=void 0;var a,r,i,c,s,u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=e("./LoadingUtil"),d=new l.LoadingUtil,m="1a2814361cbcccc8033ad0ab9ec86c06",p={},f=!1,h=!1,v=function(){function e(){o(this,e)}return u(e,[{key:"init",value:function(e,t){function n(){console.log("SoundCloudController::scriptLoadComp");var n=document.createElement("canvas");n.id="SoundCloudController_debug",SC.initialize({client_id:m}),SC.get("/resolve",{url:e},function(e){if(!e.errors){c.innerHTML+="<a href='"+e.permalink_url+"' target='_blank' >"+e.title+"</a><canvas id='SoundCloudController_equalizer'></canvas>",c.className="__SC__menu",console.log(e),a=document.createElement("audio"),a.crossOrigin="anonymous",a.src=e.stream_url+"?client_id="+m;var o=new(window.AudioContext||window.webkitAudioContext);i=o.createAnalyser(),i.fftSize=2048;var s=o.createMediaElementSource(a);s.connect(i),i.connect(o.destination),r=new Uint8Array(i.frequencyBinCount),h=!0,t(c,n)}})}var o="<img src='assets/logo_white-af5006050dd9cba09b0c48be04feac57.png'>";c=document.createElement("div"),c.innerHTML=o,d.multiLoad([function(e){d.scriptLoad("//connect.soundcloud.com/sdk.js",e)},function(e){d.scriptLoad("//cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js",e)}],n)}},{key:"getControllerElement",value:function(){return c}},{key:"play",value:function(){function e(){if(setTimeout(e,66),a.volume<.99?a.volume+=.005:a.volume=1,n.clearRect(0,0,25,12),n.beginPath(),f){n.fillStyle="#ffffff";for(var t=0,o=0;o<5;o++)t=4+.1*r[10*o]+Math.random()*(o+2)*4,n.rect(5*o,16-t,4,t)}else{n.fillStyle="#777777";for(var t=0,o=0;o<5;o++)t=10-o,n.rect(5*o,16-t,4,t)}n.fill()}var t=this;if(a.play(),f=!0,!s){s=document.getElementById("SoundCloudController_equalizer");var n=s.getContext("2d");s.width=25,s.height=12,s.onclick=function(){t.togglePlayPause()},a.loop=!0,a.volume=0,e()}}},{key:"togglePlayPause",value:function(){f?this.pause():this.play()}},{key:"pause",value:function(){f=!1,a.pause()}},{key:"stop",value:function(){a.pause(),a.currentTime=0}},{key:"update",value:function(){if(h){i.getByteFrequencyData(r);var e,t=i.frequencyBinCount;for(var n in p)p[n].gain=0;for(var o=0;o<.1*t;o++){e=r[o]+Math.abs(r[o]/b(44100/2048*o));for(var n in p)o==p[n].freq-1&&(p[n].gain+=e/3),o==p[n].freq+0&&(p[n].gain+=e/3),o==p[n].freq+1&&(p[n].gain+=e/3,p[n].gain<=130&&(p[n].gain=0))}}}},{key:"getBytes",value:function(){return r?r:[]}},{key:"getIsPlay",value:function(){return f}},{key:"setPoint",value:function(e,t){p[e]={freq:t,gain:0}}},{key:"removePoint",value:function(e){delete p[e]}},{key:"getGain",value:function(e){return p.hasOwnProperty(e)?p[e].gain:0}}]),e}(),b=function(e){var t=e*e,n=t*t,o=10*Math.log10(1.562339*n/((t+11589.09305)*(t+544440.6705)));return o+=10*Math.log10(2.242881*Math.pow(10,16)*n/(Math.pow(t+424.3186774,2)*Math.pow(t+148699001.4,2)))};n.SoundCloud=v},{"./LoadingUtil":1}],3:[function(e,t,n){"use strict";function o(){function e(){t=window.innerWidth,n=window.innerHeight,r&&(r.setSize(t,n),r.setViewport(0,0,t,n),c.aspect=t/n,c.updateProjectionMatrix())}var t,n;t=window.innerWidth,n=window.innerHeight;var o=Math.min(1.5,window.devicePixelRatio),r=new THREE.WebGLRenderer({canvas:document.getElementById("canvas"),antialias:!0});r.setClearColor(0,1),r.setSize(t,n),r.setPixelRatio(o);var i=new THREE.Scene,c=new THREE.PerspectiveCamera(75,t/n,1,1e3);c.position.set(0,1,-3),c.lookAt(new THREE.Vector3);var s=new a(c);return window.addEventListener("resize",e),{renderer:r,scene:i,controls:s,camera:c}}var a=e("three-orbit-controls")(THREE);t.exports=o},{"three-orbit-controls":6}],4:[function(e,t,n){"use strict";function o(){requestAnimationFrame(o),v.update(),u.render(b,c,g),P.texture1.value=g.texture,h&&(h.image.data=v.getBytes(),h.needsUpdate=!0,L.map=h,L.needsUpdate=!0,P.audioTexture.value=h),C.rotation.y+=.01,C.rotation.x+=.01,u.render(s,c)}var a=e("./lib/SoundCloud.js"),r=e("./lib/createThree"),i=r(),c=i.camera,s=i.scene,u=i.renderer,l=(i.controls,e("glslify")),d=l(["#define GLSLIFY 1\n/**\n * Set the colour to a lovely pink.\n * Note that the color is a 4D Float\n * Vector, R,G,B and A and each part\n * runs from 0.0 to 1.0\n */\n\nuniform sampler2D texture1;\n\nvoid main() {\n\n  gl_FragColor = texture2D( texture1, gl_PointCoord );\n//  gl_FragColor = vec4(1.0,  // R\n//                      0.0,  // G\n//                      1.0,  // B\n//                      1.0); // A\n\n//    gl_FragColor = vColor;\n}"]),m=l(["#define GLSLIFY 1\n/**\n * Multiply each vertex by the\n * model-view matrix and the\n * projection matrix (both provided\n * by Three.js) to get a final\n * vertex position\n */\n\nuniform sampler2D texture1;\n//varying vec4 vColor;\n\nattribute float index1;\nconst float frag = 1.0 / 8.0;\nconst float texShift = 0.5 * frag;\n\nvoid main() {\n\n    float pu = fract(index1 * frag + texShift);\n    float pv = floor(index1 * frag) * frag + texShift;\n    vec3 tPosition = texture2D(texture1, vec2(pu, pv)).rgb * 2.0 - 1.0;\n\n    gl_Position  = projectionMatrix * viewMatrix * vec4(tPosition, 1.0);\n    gl_PointSize = 32.0;\n\n}"]),p=l(["#define GLSLIFY 1\n/**\n * Set the colour to a lovely pink.\n * Note that the color is a 4D Float\n * Vector, R,G,B and A and each part\n * runs from 0.0 to 1.0\n */\n\nvarying vec3 vColor;\n\nvoid main() {\n\n//  gl_FragColor = vec4(1.0,  // R\n//                      0.0,  // G\n//                      1.0,  // B\n//                      1.0); // A\n\n    gl_FragColor = vec4(vColor, 1.0);\n}"]),f=l(["#define GLSLIFY 1\n/**\n * Multiply each vertex by the\n * model-view matrix and the\n * projection matrix (both provided\n * by Three.js) to get a final\n * vertex position\n */\n\nvarying vec3 vColor;\nattribute float index1;\n\nconst float frag = 1.0 / 8.;\nconst float texShift = 0.5 * frag;\n\nvoid main() {\n\n  vec4 pos1 = modelMatrix * vec4(position,1.0);\n//  vec4 pos1 = vec4(position,1.0);\n//  vColor = ((normalize(pos1) + 1.0) * 0.5).xyz;\n  vColor = (1.0 + pos1.xyz) * 0.5;\n\n  float pu = fract(index1 * frag) * 2.0 - 1.0;\n  float pv = floor(index1 * frag) * frag * 2.0 - 1.0;\n  gl_Position = vec4(pu + texShift, pv + texShift, 0.0, 1.0);\n  gl_PointSize = 1.0;\n\n}"]);c.position.set(1,1,3),c.lookAt(new THREE.Vector3);var h;window.texture2=h;var v=new a.SoundCloud;v.init("https://soundcloud.com/floatingpoints/for-marmish-part-ii",function(e,t){document.body.appendChild(e),document.body.appendChild(t),h=new THREE.DataTexture(v.getBytes(),8,8,THREE.RGBFormat),h.needsUpdate=!0,window.texture2=h,v.play(),window.soundCloud=v});for(var b=new THREE.Scene,g=new THREE.WebGLRenderTarget(8,8,{minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter}),E=new THREE.ShaderMaterial({vertexShader:f,fragmentShader:p}),y=new THREE.BoxBufferGeometry(1,1,1,2,2),w=y.attributes.position.array.length/3,x=new Float32Array(w),T=0;T<w;T++)x[T]=T;y.addAttribute("index1",new THREE.BufferAttribute(x,1));var C=new THREE.Points(y,E);b.add(C);var P={texture1:{type:"t",value:null},audioTexture:{type:"t",value:null}},R=new THREE.ShaderMaterial({uniforms:P,vertexShader:m,fragmentShader:d}),O=new THREE.Points(y,R);s.add(O);var M=new THREE.MeshBasicMaterial({map:g.texture}),S=new THREE.PlaneBufferGeometry(1,1),j=new THREE.Mesh(S,M);j.position.x=2,j.position.y=2,s.add(j);var L=new THREE.MeshBasicMaterial({map:null}),H=new THREE.PlaneBufferGeometry(1,1),k=new THREE.Mesh(H,L);k.position.x=2,k.position.y=0,s.add(k),o()},{"./lib/SoundCloud.js":2,"./lib/createThree":3,glslify:5}],5:[function(e,t,n){t.exports=function(e){"string"==typeof e&&(e=[e]);for(var t=[].slice.call(arguments,1),n=[],o=0;o<e.length-1;o++)n.push(e[o],t[o]||"");return n.push(e[o]),n.join("")}},{}],6:[function(e,t,n){t.exports=function(e){function t(t,n){function o(){return 2*Math.PI/60/60*A.autoRotateSpeed}function a(){return Math.pow(.95,A.zoomSpeed)}function r(e){V.theta-=e}function i(e){V.phi-=e}function c(t){A.object instanceof e.PerspectiveCamera?Y/=t:A.object instanceof e.OrthographicCamera?(A.object.zoom=Math.max(A.minZoom,Math.min(A.maxZoom,A.object.zoom*t)),A.object.updateProjectionMatrix(),Z=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),A.enableZoom=!1)}function s(t){A.object instanceof e.PerspectiveCamera?Y*=t:A.object instanceof e.OrthographicCamera?(A.object.zoom=Math.max(A.minZoom,Math.min(A.maxZoom,A.object.zoom/t)),A.object.updateProjectionMatrix(),Z=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),A.enableZoom=!1)}function u(e){G.set(e.clientX,e.clientY)}function l(e){J.set(e.clientX,e.clientY)}function d(e){W.set(e.clientX,e.clientY)}function m(e){q.set(e.clientX,e.clientY),X.subVectors(q,G);var t=A.domElement===document?A.domElement.body:A.domElement;r(2*Math.PI*X.x/t.clientWidth*A.rotateSpeed),i(2*Math.PI*X.y/t.clientHeight*A.rotateSpeed),G.copy(q),A.update()}function p(e){$.set(e.clientX,e.clientY),ee.subVectors($,J),ee.y>0?c(a()):ee.y<0&&s(a()),J.copy($),A.update()}function f(e){K.set(e.clientX,e.clientY),Q.subVectors(K,W),oe(Q.x,Q.y),W.copy(K),A.update()}function h(e){}function v(e){e.deltaY<0?s(a()):e.deltaY>0&&c(a()),A.update()}function b(e){switch(e.keyCode){case A.keys.UP:oe(0,A.keyPanSpeed),A.update();break;case A.keys.BOTTOM:oe(0,-A.keyPanSpeed),A.update();break;case A.keys.LEFT:oe(A.keyPanSpeed,0),A.update();break;case A.keys.RIGHT:oe(-A.keyPanSpeed,0),A.update()}}function g(e){G.set(e.touches[0].pageX,e.touches[0].pageY)}function E(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,o=Math.sqrt(t*t+n*n);J.set(0,o)}function y(e){W.set(e.touches[0].pageX,e.touches[0].pageY)}function w(e){q.set(e.touches[0].pageX,e.touches[0].pageY),X.subVectors(q,G);var t=A.domElement===document?A.domElement.body:A.domElement;r(2*Math.PI*X.x/t.clientWidth*A.rotateSpeed),i(2*Math.PI*X.y/t.clientHeight*A.rotateSpeed),G.copy(q),A.update()}function x(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,o=Math.sqrt(t*t+n*n);$.set(0,o),ee.subVectors($,J),ee.y>0?s(a()):ee.y<0&&c(a()),J.copy($),A.update()}function T(e){K.set(e.touches[0].pageX,e.touches[0].pageY),Q.subVectors(K,W),oe(Q.x,Q.y),W.copy(K),A.update()}function C(e){}function P(e){if(A.enabled!==!1){if(e.preventDefault(),e.button===A.mouseButtons.ORBIT){if(A.enableRotate===!1)return;u(e),U=D.ROTATE}else if(e.button===A.mouseButtons.ZOOM){if(A.enableZoom===!1)return;l(e),U=D.DOLLY}else if(e.button===A.mouseButtons.PAN){if(A.enablePan===!1)return;d(e),U=D.PAN}U!==D.NONE&&(document.addEventListener("mousemove",R,!1),document.addEventListener("mouseup",O,!1),A.dispatchEvent(F))}}function R(e){if(A.enabled!==!1)if(e.preventDefault(),U===D.ROTATE){if(A.enableRotate===!1)return;m(e)}else if(U===D.DOLLY){if(A.enableZoom===!1)return;p(e)}else if(U===D.PAN){if(A.enablePan===!1)return;f(e)}}function O(e){A.enabled!==!1&&(h(e),document.removeEventListener("mousemove",R,!1),document.removeEventListener("mouseup",O,!1),A.dispatchEvent(_),U=D.NONE)}function M(e){A.enabled===!1||A.enableZoom===!1||U!==D.NONE&&U!==D.ROTATE||(e.preventDefault(),e.stopPropagation(),v(e),A.dispatchEvent(F),A.dispatchEvent(_))}function S(e){A.enabled!==!1&&A.enableKeys!==!1&&A.enablePan!==!1&&b(e)}function j(e){if(A.enabled!==!1){switch(e.touches.length){case 1:if(A.enableRotate===!1)return;g(e),U=D.TOUCH_ROTATE;break;case 2:if(A.enableZoom===!1)return;E(e),U=D.TOUCH_DOLLY;break;case 3:if(A.enablePan===!1)return;y(e),U=D.TOUCH_PAN;break;default:U=D.NONE}U!==D.NONE&&A.dispatchEvent(F)}}function L(e){if(A.enabled!==!1)switch(e.preventDefault(),e.stopPropagation(),e.touches.length){case 1:if(A.enableRotate===!1)return;if(U!==D.TOUCH_ROTATE)return;w(e);break;case 2:if(A.enableZoom===!1)return;if(U!==D.TOUCH_DOLLY)return;x(e);break;case 3:if(A.enablePan===!1)return;if(U!==D.TOUCH_PAN)return;T(e);break;default:U=D.NONE}}function H(e){A.enabled!==!1&&(C(e),A.dispatchEvent(_),U=D.NONE)}function k(e){e.preventDefault()}this.object=t,this.domElement=void 0!==n?n:document,this.enabled=!0,this.target=new e.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-(1/0),this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.25,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={ORBIT:e.MOUSE.LEFT,ZOOM:e.MOUSE.MIDDLE,PAN:e.MOUSE.RIGHT},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return B.phi},this.getAzimuthalAngle=function(){return B.theta},this.reset=function(){A.target.copy(A.target0),A.object.position.copy(A.position0),A.object.zoom=A.zoom0,A.object.updateProjectionMatrix(),A.dispatchEvent(N),A.update(),U=D.NONE},this.update=function(){var n=new e.Vector3,a=(new e.Quaternion).setFromUnitVectors(t.up,new e.Vector3(0,1,0)),i=a.clone().inverse(),c=new e.Vector3,s=new e.Quaternion;return function(){var e=A.object.position;return n.copy(e).sub(A.target),n.applyQuaternion(a),B.setFromVector3(n),A.autoRotate&&U===D.NONE&&r(o()),B.theta+=V.theta,B.phi+=V.phi,B.theta=Math.max(A.minAzimuthAngle,Math.min(A.maxAzimuthAngle,B.theta)),B.phi=Math.max(A.minPolarAngle,Math.min(A.maxPolarAngle,B.phi)),B.makeSafe(),B.radius*=Y,B.radius=Math.max(A.minDistance,Math.min(A.maxDistance,B.radius)),A.target.add(I),n.setFromSpherical(B),n.applyQuaternion(i),e.copy(A.target).add(n),A.object.lookAt(A.target),A.enableDamping===!0?(V.theta*=1-A.dampingFactor,V.phi*=1-A.dampingFactor):V.set(0,0,0),Y=1,I.set(0,0,0),!!(Z||c.distanceToSquared(A.object.position)>z||8*(1-s.dot(A.object.quaternion))>z)&&(A.dispatchEvent(N),c.copy(A.object.position),s.copy(A.object.quaternion),Z=!1,!0)}}(),this.dispose=function(){A.domElement.removeEventListener("contextmenu",k,!1),A.domElement.removeEventListener("mousedown",P,!1),A.domElement.removeEventListener("wheel",M,!1),A.domElement.removeEventListener("touchstart",j,!1),A.domElement.removeEventListener("touchend",H,!1),A.domElement.removeEventListener("touchmove",L,!1),document.removeEventListener("mousemove",R,!1),document.removeEventListener("mouseup",O,!1),window.removeEventListener("keydown",S,!1)};var A=this,N={type:"change"},F={type:"start"},_={type:"end"},D={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_DOLLY:4,TOUCH_PAN:5},U=D.NONE,z=1e-6,B=new e.Spherical,V=new e.Spherical,Y=1,I=new e.Vector3,Z=!1,G=new e.Vector2,q=new e.Vector2,X=new e.Vector2,W=new e.Vector2,K=new e.Vector2,Q=new e.Vector2,J=new e.Vector2,$=new e.Vector2,ee=new e.Vector2,te=function(){var t=new e.Vector3;return function(e,n){t.setFromMatrixColumn(n,0),t.multiplyScalar(-e),I.add(t)}}(),ne=function(){var t=new e.Vector3;return function(e,n){t.setFromMatrixColumn(n,1),t.multiplyScalar(e),I.add(t)}}(),oe=function(){var t=new e.Vector3;return function(n,o){var a=A.domElement===document?A.domElement.body:A.domElement;if(A.object instanceof e.PerspectiveCamera){var r=A.object.position;t.copy(r).sub(A.target);var i=t.length();i*=Math.tan(A.object.fov/2*Math.PI/180),te(2*n*i/a.clientHeight,A.object.matrix),ne(2*o*i/a.clientHeight,A.object.matrix)}else A.object instanceof e.OrthographicCamera?(te(n*(A.object.right-A.object.left)/A.object.zoom/a.clientWidth,A.object.matrix),ne(o*(A.object.top-A.object.bottom)/A.object.zoom/a.clientHeight,A.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),A.enablePan=!1)}}();A.domElement.addEventListener("contextmenu",k,!1),A.domElement.addEventListener("mousedown",P,!1),A.domElement.addEventListener("wheel",M,!1),A.domElement.addEventListener("touchstart",j,!1),A.domElement.addEventListener("touchend",H,!1),A.domElement.addEventListener("touchmove",L,!1),window.addEventListener("keydown",S,!1),this.update()}return t.prototype=Object.create(e.EventDispatcher.prototype),t.prototype.constructor=t,Object.defineProperties(t.prototype,{center:{get:function(){return console.warn("THREE.OrbitControls: .center has been renamed to .target"),this.target}},noZoom:{get:function(){return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),!this.enableZoom},set:function(e){console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),this.enableZoom=!e}},noRotate:{get:function(){return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),!this.enableRotate},set:function(e){console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),this.enableRotate=!e}},noPan:{get:function(){return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),!this.enablePan},set:function(e){console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),this.enablePan=!e}},noKeys:{get:function(){return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),!this.enableKeys},set:function(e){console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),this.enableKeys=!e}},staticMoving:{get:function(){return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),!this.enableDamping},set:function(e){console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),this.enableDamping=!e}},dynamicDampingFactor:{get:function(){return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor},set:function(e){console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor=e}}}),t}},{}]},{},[4]);
