function cubeInit() {
  var container = document.getElementById("cube-canvas");
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  var clock = new THREE.Clock();
  renderer.setSize(200, 200);
  container.appendChild(renderer.domElement);
  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshNormalMaterial();
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 3;
  var render = function () {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    cube.rotation.x += 3.2 * delta;
    cube.rotation.y += 3.2 * delta;
    renderer.render(scene, camera);
  };
  render();
}