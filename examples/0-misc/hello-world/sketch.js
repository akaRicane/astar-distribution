/* ---------------------- ASTAR x THREEJS BASIC SKETCH ---------------------- */
// ThreeJS instance is available through the THREE variable
// Make sure you added the threejs dependency on your workspace manager

/* -------------------------- SCENE INITIALIZATION -------------------------- */

const scene = new THREE.Scene();
scene.background = new THREE.Color("#663399");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* -------------------- BASIC BOX DISPLAY WITH WIREFRAME -------------------- */

const geometry = new THREE.BoxGeometry(2, 2, 2, 3, 3, 3);
const material = new THREE.MeshBasicMaterial({ color: "#490165" });
const material_wireframe = new THREE.MeshBasicMaterial({
  color: "#ff69b4",
  wireframe: true,
});
const box = new THREE.Mesh(geometry, material);
const box_wireframe = new THREE.Mesh(geometry, material_wireframe);
scene.add(box);
scene.add(box_wireframe);

let box_size = createControl("SIZE", 1);
let wireframe_toggle = createControl("WIREFRAME", "note_off");

/* --------------------------- ANIMATE / REAL TIME -------------------------- */
window.postMessage("from hello world, hello", "*");

function animate() {
  requestAnimationFrame(animate);
  window.postMessage(
    {
      type: "timestamp",
      timestamp: Date.now(),
    },
    "*"
  );

  // let counter = 0;
  // while (counter < Math.random() * (1e9 - 1e7) + 1e7) {
  //   counter++;
  // }

  // Change the box size through the ASTAR control
  box.scale.set(box_size.value, box_size.value, box_size.value);
  box_wireframe.scale.set(
    box_size.value * 1.1,
    box_size.value * 1.1,
    box_size.value * 1.1
  );

  // Display or hide the box wireframe through the ASTAR control
  if (wireframe_toggle.value === "note_on") {
    box_wireframe.visible = true;
  } else {
    box_wireframe.visible = false;
  }

  // Rotate the box
  box.rotation.x += 0.01;
  box.rotation.z -= 0.004;
  box_wireframe.rotation.x += 0.01;
  box_wireframe.rotation.z -= 0.004;

  // Render the scene
  renderer.render(scene, camera);
}

animate();
