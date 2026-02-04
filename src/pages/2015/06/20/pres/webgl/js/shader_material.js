Player = {
  init: function() {
    Player.container = document.getElementById("webgl-player-shader");
    
    Player.size = {
      width: Player.container.offsetWidth,
      height: Player.container.offsetHeight
    };

    Player.scene = new THREE.Scene();

    Player.camera = new THREE.PerspectiveCamera(45.0, Player.size.width / Player.size.height, 2, 8000);
    // Player.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 50);
    Player.camera.position.z = 2500;
    Player.scene.add(Player.camera);

    // Player.light = new THREE.AmbientLight(0x404040);
    Player.light = new THREE.AmbientLight(0xffffff);
    Player.scene.add(Player.light);

    textureLoader = new THREE.TextureLoader();

    textureLoader.load("./object/couple.png", function(texture) {
      Player.texture = texture;

      Player.loadModel();
    });

    Player.renderer = new THREE.WebGLRenderer({alpha: true});

    Player.renderer.setSize(Player.size.width, Player.size.height);
    Player.container.appendChild(Player.renderer.domElement);

    Player.controls = new THREE.TrackballControls(Player.camera, Player.container);

    Player.controls.rotateSpeed = 2.5
    Player.controls.zoomSpeed = 1.2
    Player.controls.panSpeed = 0.2
    Player.controls.noZoom = false
    Player.controls.noPan = false
    Player.controls.staticMoving = false
    Player.controls.dynamicDampingFactor = 0.1

    window.addEventListener("resize", Player.onWindowResize, false);

    Player.animate();
  },

  loadModel: function() {

    objectLoader = new THREE.OBJLoader();

    objectLoader.load("./object/couple.obj", function(object) {
      Player.mesh = object;
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          var vShader = document.getElementById("vshader").text;
          var fShader = document.getElementById("fshader").text;

          child.material = new THREE.ShaderMaterial( { 
            uniforms: {
                u_Sampler: {type: "t", value: Player.texture}
            },
            vertexShader: vShader,
            fragmentShader: fShader,
          } );
        }
      });
      
      Player.mesh.rotation.x = 1500;
      Player.mesh.position.y = -850;

      Player.scene.add(object);
      document.getElementById("preloader-shader").remove();
    });
  },

  animate: function() {
    if (Player.mesh) {  
      Player.mesh.rotation.z += 0.005; 
    }

    requestAnimationFrame(Player.animate);
    Player.controls.update();
    Player.renderer.render(Player.scene, Player.camera);
  },

  onWindowResize: function() {
    Player.camera.aspect = Player.container.offsetWidth / Player.container.offsetHeight;
    Player.camera.updateProjectionMatrix();
    Player.renderer.setSize(Player.container.offsetWidth, Player.container.offsetHeight);
  }
};
