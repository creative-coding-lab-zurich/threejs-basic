import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Base
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Geometry from points
 */
// Create an empty BufferGeometry
const randomGeometry = new THREE.BufferGeometry();

// Create 50 triangles (450 values)
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
randomGeometry.setAttribute("position", positionsAttribute);

/**
 * Transformations and Positions
 */
mesh.position.set(0.7, -0.6, 1);
mesh.scale.x = 2;
mesh.scale.y = 0.25;
mesh.scale.z = 0.5;
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
console.log(mesh.position.length());
// console.log(mesh.position.distanceTo(camera.position));

/**
 * Objects
 */
const group = new THREE.Group();
// group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
cube1.position.x = -1.5;
group.add(cube1);

// const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
const cube2 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(4, 1, 10, 16),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
cube2.position.x = 0;
group.add(cube2);

// const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
const cube3 = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 3), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube3.position.x = 1.5;
// group.add(cube3);

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const aspectRatio = sizes.width / sizes.height;
const cameraOrto = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
camera.position.z = 3;
camera.lookAt(new THREE.Vector3(0, -1, 0));
camera.lookAt(mesh.position);
scene.add(camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

// Controls
const controls = new OrbitControls(camera, canvas);

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);

  console.log(cursor.x, cursor.y);
});

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 * Animate
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // // Update objects
  // mesh.rotation.y = elapsedTime;
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);

  // // Update camera
  // camera.position.x = Math.cos(elapsedTime);
  // camera.position.y = Math.sin(elapsedTime);
  // camera.lookAt(mesh.position);

  // // Update camera based on cursor
  // const cameraAmplitude = 5;
  // camera.position.x = cursor.x * cameraAmplitude;
  // camera.position.y = cursor.y * cameraAmplitude;
  // camera.lookAt(mesh.position);

  // //Update camera with full rotation
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 3;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
