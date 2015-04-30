/**
Initializes the scene, camera, and renderer
And sets the position of the camera to (0,0,5)
*/
function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();

  camera = new THREE.PerspectiveCamera(75,
                                      window.innerWidth /
                                      window.innerHeight,
                                      0.1,
                                      1000);

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  light = new THREE.HemisphereLight(0xFFFFFF, 1.0);

  scene.add(light);

  camera.position.z = 80;

  //getRandomCubesInRadius(100, 1000);
  
  // Set up the l-system
  var sys = new LSystem();
  var axiom = "F P F F P";
  var t1 = "F > F [ P v v F P ] < < ^ F P";
  var t2 = "P P F [ < F P > F] P";
  sys.setAxiom(axiom);
  sys.addTransformation(t1);
  sys.addTransformation(t2);
  var sequence = sys.applyRule(4);
  
  //console.log(sequence);
  
  // Create the turtle interpreter
  var turtleObj = new THREE.Object3D();
  var distance = 1;
  var angle = Math.PI / 4;
  var turtleInterpreter = new Turtle(turtleObj, distance, angle);
  
  // hopefully it works
  turtleInterpreter.executeSequence(sequence, scene, getCubeMesh);
}

/**
Renders the scene created in init() [see init()]
*/
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

/**
Returns an array of cubes in random positions
within the given radius

@param rad The radius to generate cube meshes
@param nGen The number of cubes to generate
*/
function getRandomCubesInRadius(rad, nGen) {
  for (var i = 0; i < nGen; ++i) {
    var randomVerticalAngle = THREE.Math.random16() * (Math.PI * 2);
    var randomHorizontalAngle = THREE.Math.random16() * (Math.PI * 2);
    var randomMagnitude = THREE.Math.random16() * (rad);

    var newMesh = getCubeMesh();

    newMesh.position.set(Math.cos(randomVerticalAngle) * 
                         randomMagnitude,
                         Math.sin(randomVerticalAngle) * 
                         randomMagnitude,
                         Math.sin(randomHorizontalAngle) * 
                         randomMagnitude);

    addMeshToScene(newMesh);
  }
}

/**
Takes a mesh, and adds it to the scene created in init()
*/
function addMeshToScene(mesh) {
  scene.add(mesh);
}

/**
Returns a cube with the given color
*/
function getCubeMesh() {
  var geom = new THREE.BoxGeometry(1,1,1);
  var mat = new THREE.MeshPhongMaterial({color: 0x1D54B3});
  return new THREE.Mesh(geom, mat);
}
