AFRAME.registerComponent('stick-target', {
  init: function() {
      this.setupModel(this.data.id);
  },
  setupModel: function(id: string) {
    const model = this.createModel();
    this.el.setObject3D('mesh', model);
  },
  createModel: function() {
    const sphere = this.createSphere();
    sphere.add(this.createInnerSphere());
    return sphere;
  },
  createSphere: function() {
    const geometry = new THREE.SphereGeometry( 0.05, 36, 18 );
    const material = new THREE.MeshBasicMaterial( { color: '#0475fe', transparent: true, opacity: 0.5 } );
    return new THREE.Mesh(geometry, material);
  },
  createInnerSphere: function() {
    const innerGeometry = new THREE.DodecahedronGeometry( 0.01, 0 );
    const innerMaterial = new THREE.MeshBasicMaterial( { color: '#1086ff' } );
    return new THREE.Mesh(innerGeometry, innerMaterial);
  }
});
