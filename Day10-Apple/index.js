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
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var params = {
  radius: 30,
  tube: 80,
  radialSeg: 25,
  tubularSeg: 20
};
var geometry = new THREE.TorusGeometry(
  params.radius,
  params.tube,
  params.radialSeg,
  params.tubularSeg
);
var ang = 0;
var mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
scene.add(mesh);
// var PointLight = new THREE.PointLight(0xffffff, 0.5);
// PointLight.position.set(50, 50, 250);
// scene.add(PointLight);
var PointLight2 = new THREE.PointLight(0xffffff, 0.6);
PointLight2.position.set(-50, 150, 250);
scene.add(PointLight2);
var PointLight3 = new THREE.PointLight(0xffffff, 0.6);
PointLight3.position.set(-50, -200, 150);
scene.add(PointLight3);
var Ambient3 = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(Ambient3);
camera.position.z = 350;
mesh.rotation.x += -0.8;
var update = function() {
  mesh.rotation.z += 0.1;
};
var render = function() {
  renderer.render(scene, camera);
};
var draw = function() {
  requestAnimationFrame(draw);
  controls.update();
  update();
  render();
};
draw();
