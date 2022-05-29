let scene, camera, renderer, cube;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const grassTexture = new THREE.TextureLoader().load('textures/grass.png')
  const grassDirtTexture = new THREE.TextureLoader().load('textures/grass_dirt.png')
  const dirtTexture = new THREE.TextureLoader().load('textures/dirt.png')
  const materials = [
    new THREE.MeshBasicMaterial({ map: grassDirtTexture }),
    new THREE.MeshBasicMaterial({ map: grassDirtTexture }),
    new THREE.MeshBasicMaterial({ map: grassTexture }),
    new THREE.MeshBasicMaterial({ map: dirtTexture }),
    new THREE.MeshBasicMaterial({ map: grassDirtTexture }),
    new THREE.MeshBasicMaterial({ map: grassDirtTexture }),
  ];
  cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);

  camera.position.z = 10;
  camera.position.x = 5;
  camera.position.y = 5;
}


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  camera.position.z += 1;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
