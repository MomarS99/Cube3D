// Initialisation des éléments de base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvasContainer").appendChild(renderer.domElement);

// Création du cube
let cube = makeCube();
scene.add(cube);

// Position de la caméra
camera.position.z = 5;

// Variables pour le contrôle avec la souris
let mouseDown = false;
let lastMouse = { x: 0, y: 0 };

// Contrôle de la rotation avec la souris
renderer.domElement.addEventListener("mousedown", () => {
  mouseDown = true;
});

renderer.domElement.addEventListener("mousemove", (event) => {
  if (mouseDown) {
    const moveX = event.movementX || 0;
    const moveY = event.movementY || 0;

    cube.rotation.y += moveX * 0.01;
    cube.rotation.x += moveY * 0.01;
  }
});

renderer.domElement.addEventListener("mouseup", () => {
  mouseDown = false;
});

// Fonction pour créer un cube
function makeCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshNormalMaterial();
  return new THREE.Mesh(geometry, material);
}

// Fonction pour changer la couleur
function changeColor() {
  if (cube) {
    cube.material = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
    });
  }
}

// Fonction pour masquer le cube
function hideCube() {
  const container = document.getElementById("canvasContainer");
  container.style.display = "none";  // display non
}

// Fonction pour afficher le cube
function showCube() {
  const container = document.getElementById("canvasContainer");
  container.style.display = "flex"; //display off
}

// Animation continue
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Ajuster l'affichage quand la fenêtre change de taille
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


document.getElementById("btnColor").addEventListener("click", changeColor);
document.getElementById("btnHide").addEventListener("click", hideCube);
document.getElementById("btnShow").addEventListener("click", showCube);

// Lancer l'animation
animate();
