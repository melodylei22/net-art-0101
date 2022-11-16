import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/RGBELoader.js'

// create a scene
const scene = new THREE.Scene()

// create camera

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2;



const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x000000, 0);

const canvas = document.querySelector("#canvas");
canvas.appendChild(renderer.domElement);


  
const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/queer.gltf', (gltf) => {
      const root = gltf.scene;


      scene.add(root);


    })

   
    // controls
    const controls = new OrbitControls( camera, renderer.domElement );

    const rgbeLoader = new RGBELoader()
    const texture = await rgbeLoader.loadAsync(
        "./assets/satara_night_4k.hdr"
    )

texture.mapping = THREE.EquirectangularReflectionMapping;


scene.environment = texture;


        // lights
        const ambientLight = new THREE.AmbientLight("#c3d9de", 1)
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0x404040,2);
        directionalLight.position.set(0,-3 ,0);
    
        const directLighttwo = new THREE.DirectionalLight(
            "#d69f09",
            0.2);
        directLighttwo.position.set(0, -1, 0);
        scene.add(directionalLight, directLighttwo);
    

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

}

function animate(){

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

animate()