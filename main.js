import {GLTFLoader} from "./GLTFLoader.js";
const canvas = document.querySelector('#car');
var scene = new THREE.Scene();

let gridWidth = $(".half-grid-two").width();
let gridHeight = $(".half-grid-two").height();

var camera = new THREE.PerspectiveCamera(
    75,
    gridWidth / gridHeight,
    0.1,
    1000
);

var renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
renderer.setSize(gridWidth, gridHeight);
renderer.shadowMap.enabled = true;

var gui = new dat.GUI();

var loader = new GLTFLoader();

var obj;


loader.load("scene.gltf", function (gltf){
    
    scene.add(gltf.scene);

    gltf.scene.scale.set(0.4, 0.4, 0.4);
    gltf.scene.position.set(0, -0.15, 0);
    gltf.scene.rotation.y = -1;

    
    gltf.scene.castShadow = true;

    obj = gltf.scene;
    test();
    gui.add(gltf.scene.rotation, 'x').min(-9).max(9)
    gui.add(gltf.scene.rotation, 'y').min(-9).max(9)
    gui.add(gltf.scene.rotation, 'z').min(-9).max(9)
    gui.add(gltf.scene.position, 'x').min(-20).max(20)
    gui.add(gltf.scene.position, 'y').min(-20).max(20)
    gui.add(gltf.scene.position, 'z').min(-20).max(20)

});

function test() {
    var tl = new gsap.timeline();
    tl.from(obj.position, { x: 10, z: -10, duration: 1})
    tl.fromTo(plight.position, {x: -20}, {x: 20, duration: 10, repeat: -1, yoyo: true}, "lights")

    gsap.registerPlugin(ScrollTrigger);
    var banner = gsap.timeline({
        scrollTrigger: {
            trigger: ".banner",
            start: "0% 0%",
            end: "200%",
            scrub: 0.5,
            anticipatePin: 1
        }
    });

    banner.to(obj.rotation, {y: -0.5, duration: 1})
    banner.to(obj.scale, { x: 0.45, y: 0.45, z: 0.45, duration: 4}, "rotatecar")
    banner.to(obj.position, { y: -0.25, duration: 4}, "rotatecar")
    banner.to("canvas#car", {css:{top:topPos, left: -leftPos/1.5}, duration: 4}, "rotatecar");
    banner.to(obj.rotation, {y: 1, duration: 10}, "rotatecar")
}


var dlight = new THREE.DirectionalLight(0xffffff, 10);
dlight.position.set(-3,8.6,-5.7);
dlight.castShadow = true;
dlight.castShadow = true;
dlight.shadowDarkness = 0.2;
dlight.shadow.bias = 0.0001;
dlight.shadow.camera.visible = true; 
scene.add(dlight)

const plight = new THREE.SpotLight( 0xffffff );
plight.position.set( 0, 10, 4 );
plight.castShadow = true;
plight.shadowDarkness = 0.2;
plight.shadow.bias = 0.0001;
scene.add( plight );

    gui.add(plight.rotation, 'x').min(-9).max(9)
    gui.add(plight.rotation, 'y').min(-9).max(9)
    gui.add(plight.rotation, 'z').min(-9).max(9)
    gui.add(plight.position, 'x').min(-20).max(20)
    gui.add(plight.position, 'y').min(-20).max(20)
    gui.add(plight.position, 'z').min(-20).max(20)

var light = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );
scene.add( light );

camera.position.set(0, 0.5, 2);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

    let gridWidth = $(".half-grid-two").width();
    let gridHeight = $(".half-grid-two").height();

    camera.aspect = gridWidth/ gridHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( gridWidth, gridHeight );
}

animate();