PlayerW = {
  init: function() {
    this.requestId = 0
    this.playAnimate = true

    this.container = document.getElementById("webgl-player-wireframe");

    this.noRender();
    this.container.onmousedown = this.noRender
    this.container.onmousemove = this.noRender


    this.wireframe = document.getElementById("mode-wireframe");
    this.wireframe.onclick = this.toggleWireframe

    this.size = {
      width: PlayerW.container.offsetWidth,
      height: PlayerW.container.offsetHeight
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45.0, this.size.width / this.size.height, 2, 8000);
    this.camera.position.z = 300;
    this.scene.add(this.camera);

    light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);

    var textureLoader = new THREE.TextureLoader();

    textureLoader.load("./object/earth.jpg", function(texture) {
      material =new THREE.MeshPhongMaterial({map: texture});
      geometry = new THREE.SphereGeometry(100, 50, 50);
      PlayerW.mesh = new THREE.Mesh(geometry, material);
      PlayerW.scene.add(PlayerW.mesh);
      document.getElementById("preloader-wireframe").remove();
    });

    this.renderer = new THREE.WebGLRenderer({alpha: true});

    this.renderer.setSize(this.size.width, this.size.height);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new THREE.TrackballControls(this.camera, this.container);

    this.controls.rotateSpeed = 2.5
    this.controls.zoomSpeed = 1.2
    this.controls.panSpeed = 0.2
    this.controls.noZoom = false
    this.controls.noPan = false
    this.controls.staticMoving = false
    this.controls.dynamicDampingFactor = 0.1

    window.addEventListener("resize", this.onWindowResize, false);

    this.animate();
  },

  animate: function() {
    if (!PlayerW.playAnimate && PlayerW.requestId){
      cancelAnimationFrame(PlayerW.requestId);
      return false;
    }

    PlayerW.requestId = requestAnimationFrame(PlayerW.animate);
    PlayerW.controls.update();
    PlayerW.renderer.render(PlayerW.scene, PlayerW.camera);
  },

  noRender: function() {
    if(!PlayerW.playAnimate){
      PlayerW.playAnimate = true;
      PlayerW.animate();
    }
    if (PlayerW.noRenderTimer)
      clearInterval(PlayerW.noRenderTimer);
    PlayerW.noRenderTimer = setInterval("PlayerW.playAnimate = false", 5000)
  },

  toggleWireframe: function() {
    if(PlayerW.mesh.material.wireframe) {
      PlayerW.mesh.material.wireframe = false
      PlayerW.wireframe.innerHTML = "mesh.material.wireframe = false;"
    }
    else {
      PlayerW.mesh.material.wireframe = true
      PlayerW.wireframe.innerHTML = "mesh.material.wireframe = true;"
    }
    PlayerW.noRender();
  },

  onWindowResize: function() {
    PlayerW.camera.aspect = PlayerW.container.offsetWidth / PlayerW.container.offsetHeight;
    PlayerW.camera.updateProjectionMatrix();
    PlayerW.renderer.setSize(PlayerW.container.offsetWidth, PlayerW.container.offsetHeight);
  }
};
