import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as THREE from 'three';
import { AMOUNT_OF_SPHERES } from './utils/constants';
import { createSphere } from './forms/forms';

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

createApp(App).mount('#app')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50);
const light = new THREE.AmbientLight( 0xffffff, 1 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const spheres = [];
for (let i=0; i<AMOUNT_OF_SPHERES; i++){
    const sphere = createSphere([Math.random() * 50-25, Math.random() * 50 - 25, Math.random() * 30 - 20], 0.1, 0xffffff);
    spheres.push(sphere);
    scene.add(sphere);
}

scene.add(light);
camera.position.z = 5;

function onDocumentMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse.clone(), camera );
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera);
    spheres.forEach(sphere => {
        sphere.position.z += 0.1;
        // if mouse position is close to sphere position, change the color of the sphere
        if (mouse.x > sphere.position.x - 0.3 && mouse.x < sphere.position.x + 0.3 && mouse.y > sphere.position.y - 0.3 && mouse.y < sphere.position.y + 0.3) {
            sphere.material.color.setHex(0xff0000);
        } else {
            sphere.material.color.setHex(0xffffff);
        }

        if (sphere.position.z > 5) {
            sphere.position.z = -20;
            
        }
    });
}
animate();