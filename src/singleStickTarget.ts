let targetsCounter = 0;

AFRAME.registerComponent('single-stick-target', {
  schema: {
    position: {
      type: 'string',
      default: '0 0 0',
    },
    id: {
      type: 'string',
      default: ''
    }
  },
  init: function() {
    this.id = this.data.id;
    this.setupPosition();
    this.setupModel();
  },
  setupPosition: function() {
    this.el.setAttribute('position', this.data.position)
  },
  setupModel: function() {
    this.el.setObject3D(this.id, this.createSphere());
    this.el.getObject3D(this.id).add(this.createInnerSphere());
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
