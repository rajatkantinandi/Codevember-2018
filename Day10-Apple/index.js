var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var x = 0,
  y = 0;

var heartShape = new THREE.Shape();

heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

var extrudeSettings = {
  depth: 3,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 0.5,
  bevelSize: 1,
  bevelThickness: 1
};

var geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

var mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
);
scene.add(mesh);
camera.position.z = 50;
var update = function() {
  mesh.rotation.y += 0.01;
};
var render = function() {
  renderer.render(scene, camera);
};
var draw = function() {
  requestAnimationFrame(draw);
  update();
  render();
};
draw();
