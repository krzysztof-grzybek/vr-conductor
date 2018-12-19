AFRAME.registerComponent('single-stick-target', {
  schema: {
    items: {
      type: 'array', // id: string, position: [x: number, y: number,z: number]
      default: [],
    },
  },
  init: function() {
    this.data.items.forEach(item => {
      this.setupModel(item.id, item.position);
    })
  },
  setupModel: function(id: string, position: [number, number, number]) {
    const model = this.createModel();
    model.position.set(...position);
    this.el.setObject3D(id, model);
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
