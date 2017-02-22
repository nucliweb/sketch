const threeApp = require('./lib/createThree');
const { camera, scene, renderer, controls } = threeApp();

const glsl = require('glslify');


const simpleFrag = glsl.file('./shader/shader.frag');
const simpleVert = glsl.file('./shader/shader.vert');

const particleFragmentShader = glsl.file('./shader/particleFragmentShader.frag');
const particleVertexShader = glsl.file('./shader/particleVertexShader.vert');
const computeShaderPosition = glsl.file('./shader/computeShaderPosition.frag');
const computeShaderVelocity = glsl.file('./shader/computeShaderVelocity.vert');

var mesh;
var helper, ikHelper;
var clock = new THREE.Clock();

// Texture width for simulation (each texel is a debris particle)
var WIDTH = 128;

var geometry;
var PARTICLES = WIDTH * WIDTH;

var gpuCompute;
var velocityVariable;
var positionVariable;
var positionUniforms;
var velocityUniforms;
var particleUniforms;

init();
animate();


function init() {

    camera.position.y = 0;
    camera.position.x = 0;
    camera.position.z = -150;
    camera.lookAt(new THREE.Vector3());







    // model
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    var modelFile = 'models/mmd/miku/miku_v2.pmd';
    var vmdFiles = [ 'models/mmd/vmds/wavefile_v2.vmd' ];

    helper = new THREE.MMDHelper();

    var loader = new THREE.MMDLoader();
    loader.load( modelFile, vmdFiles, function ( object ) {

        var array = [];
        for ( var i = 0, il = object.material.materials.length; i < il; i ++ ) {
            var m = new THREE.ShaderMaterial({
                vertexShader:   simpleVert,
                fragmentShader: simpleFrag,
                skinning:true
            });
            array.push( m );
        }

        var shaderMaterials = new THREE.MultiMaterial( array );
        object.material = shaderMaterials;

        mesh = object;
        mesh.position.y = -10;

        scene.add( mesh );

        helper.add( mesh );
        helper.setAnimation( mesh );

        /*
         * Note: create CCDIKHelper after calling helper.setAnimation()
         */
        ikHelper = new THREE.CCDIKHelper( mesh );
        ikHelper.visible = false;
        scene.add( ikHelper );

        initGui();

    }, onProgress, onError );

    function initGui () {
        var api = {
            'animation': true,
            'ik': true,
            'physics': true,
            'show IK bones': false,
        };
        var gui = new dat.GUI();
        gui.add( api, 'animation' ).onChange( function () {
            helper.doAnimation = api[ 'animation' ];
        } );
        gui.add( api, 'ik' ).onChange( function () {
            helper.doIk = api[ 'ik' ];
        } );
        gui.add( api, 'physics' ).onChange( function () {
            helper.enablePhysics( api[ 'physics' ] );
        } );
        gui.add( api, 'show IK bones' ).onChange( function () {
            ikHelper.visible = api[ 'show IK bones' ];
        } );
    }










    initComputeRenderer();

    initProtoplanets();
}

function initComputeRenderer() {

    gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer );

    var dtPosition = gpuCompute.createTexture();
    var dtVelocity = gpuCompute.createTexture();

    fillTextures( dtPosition, dtVelocity );

    velocityVariable = gpuCompute.addVariable( "textureVelocity", computeShaderVelocity, dtVelocity );
    positionVariable = gpuCompute.addVariable( "texturePosition", computeShaderPosition, dtPosition );

    gpuCompute.setVariableDependencies( velocityVariable, [ positionVariable, velocityVariable ] );
    gpuCompute.setVariableDependencies( positionVariable, [ positionVariable, velocityVariable ] );

    positionUniforms = positionVariable.material.uniforms;
    velocityUniforms = velocityVariable.material.uniforms;

    positionVariable.material.uniforms.time = {
        value:0
    };

    velocityVariable.material.uniforms.time = {
        value:0
    };

    gpuCompute.init();

}


function initProtoplanets() {

    geometry = new THREE.BufferGeometry();

    var positions = new Float32Array( PARTICLES * 3 );

    for ( var i = 0; i < PARTICLES * 3; i+= 3 * 3 ) {
        positions[ i+0 ] = Math.random() * 1;
        positions[ i+1 ] = Math.random() * 1;
        positions[ i+2 ] = Math.random() * 1;

        positions[ i+3 ] = Math.random() * 1;
        positions[ i+4 ] = Math.random() * 1;
        positions[ i+5 ] = Math.random() * 1;

        positions[ i+6 ] = Math.random() * 1;
        positions[ i+7 ] = Math.random() * 1;
        positions[ i+8 ] = Math.random() * 1;
    }

    var uvs = new Float32Array( PARTICLES * 2 );
    var p = 0;
    for ( var j = 0; j < WIDTH; j++ ) {
        for ( var i = 0; i < WIDTH; i++ ) {
            uvs[ p++ ] = i / ( WIDTH - 1 );
            uvs[ p++ ] = j / ( WIDTH - 1 );
        }
    }

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

    particleUniforms = {
        texturePosition: { value: null },
        textureVelocity: { value: null },
        cameraConstant: { value: getCameraConstant( camera ) },
    };

    // ShaderMaterial
    var material = new THREE.ShaderMaterial( {
        uniforms:       particleUniforms,
        vertexShader:   particleVertexShader,
        fragmentShader: particleFragmentShader,
        side:           THREE.DoubleSide,
        transparent: true,
    } );

    material.extensions.drawBuffers = true;

    var particles = new THREE.Points( geometry, material );
    particles.matrixAutoUpdate = false;
    particles.updateMatrix();
    scene.add( particles );

}

function fillTextures( texturePosition, textureVelocity ) {

    var posArray = texturePosition.image.data;
    var velArray = textureVelocity.image.data;

    console.log("pos",posArray.length)
    console.log("vel",velArray.length)

    for ( var k = 0, kl = posArray.length; k < kl; k += 4*3 ) {
        // Position
        var x, y, z;
        var posrX = Math.random()*200 - 100;
        var posrY = Math.random()*200 - 100;
        var posrZ = Math.random()*200 - 100;
        var w = Math.random()*10.0;

        // posArrayの実態は一次元配列なので
        // x,y,z,wの順番に埋めていく。
        // wは今回は使用しないが、配列の順番などを埋めておくといろいろ使えて便利
        posArray[ k + 0 ] = posrX;
        posArray[ k + 1 ] = posrY;
        posArray[ k + 2 ] = posrZ;
        posArray[ k + 3 ] = w;

        posArray[ k + 4 ] = posrX;
        posArray[ k + 5 ] = posrY;
        posArray[ k + 6 ] = posrZ;
        posArray[ k + 7 ] = w;

        posArray[ k + 8 ] = posrX;
        posArray[ k + 9 ] = posrY;
        posArray[ k + 10 ] = posrZ;
        posArray[ k + 11 ] = w;

        // 移動する方向はとりあえずランダムに決めてみる。
        // これでランダムな方向にとぶパーティクルが出来上がるはず。
        var velX = 0.;//(Math.random()*1.0);
        var velY = 0.;//(Math.random()*2.0);
        var velZ = 0.;//(Math.random()*2.0);

        w = 0.5+Math.random()*0.5;

        velArray[ k + 0 ] = velX;
        velArray[ k + 1 ] = velY;
        velArray[ k + 2 ] = velZ;
        velArray[ k + 3 ] = w;

        velArray[ k + 4 ] = velX;
        velArray[ k + 5 ] = velY;
        velArray[ k + 6 ] = velZ;
        velArray[ k + 7 ] = w;

        velArray[ k + 8 ] = velX;
        velArray[ k + 9 ] = velY;
        velArray[ k + 10 ] = velZ;
        velArray[ k + 11 ] = w;
    }

}


function getCameraConstant( camera ) {
    return window.innerHeight / ( Math.tan( THREE.Math.DEG2RAD * 0.5 * camera.fov ) / camera.zoom );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}


function render() {

    gpuCompute.compute();

    velocityVariable.material.uniforms.time.value += 1/60;

    particleUniforms.texturePosition.value = gpuCompute.getCurrentRenderTarget( positionVariable ).texture;
    particleUniforms.textureVelocity.value = gpuCompute.getCurrentRenderTarget( velocityVariable ).texture;

    renderer.render( scene, camera );

}