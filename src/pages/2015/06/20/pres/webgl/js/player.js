PlayerT = {
  init: function() {
    PlayerT.container = document.getElementById("webgl-player");

    PlayerT.size = {
      width: PlayerT.container.offsetWidth,
      height: PlayerT.container.offsetHeight
    };

    PlayerT.scene = new THREE.Scene();
    PlayerT.camera = new THREE.PerspectiveCamera(45.0,
      PlayerT.size.width / PlayerT.size.height,
      2,
      8000);
    PlayerT.camera.position.z = 2500;
    PlayerT.scene.add(PlayerT.camera);

    PlayerT.light = new THREE.AmbientLight();
    PlayerT.scene.add(PlayerT.light);

    textureLoader = new THREE.TextureLoader();

    textureLoader.load("./object/couple.png", function(texture) {
      PlayerT.texture = texture;
      PlayerT.loadModel();
    });

    PlayerT.renderer = new THREE.WebGLRenderer();

    PlayerT.renderer.setSize(PlayerT.size.width, PlayerT.size.height);
    PlayerT.container.appendChild(PlayerT.renderer.domElement);

    PlayerT.controls = new THREE.TrackballControls(PlayerT.camera, PlayerT.container);

    PlayerT.animate();
  },

  loadModel: function() {
    objectLoader = new THREE.OBJLoader();

    objectLoader.load("./object/couple.obj", function(object) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = PlayerT.texture;
        }
      });
      object.rotation.x = 1500;
      object.position.y = -850;
      PlayerT.scene.add(object);
      document.getElementById("preloader").remove();
    });
  },

  animate: function() {
    requestAnimationFrame(PlayerT.animate);
    PlayerT.controls.update();
    PlayerT.renderer.render(PlayerT.scene, PlayerT.camera);
  }
};
