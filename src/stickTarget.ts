import { Component, registerComponent, THREE } from 'aframe';

interface StickTargetComponent extends Component {
  setupModel: () => void;
  createModel: () => THREE.Mesh;
  createSphere: () => THREE.Mesh;
  createInnerSphere: () => THREE.Mesh;
}

const componentDef: ThisType<StickTargetComponent> = {
  init: function() {
    this.setupModel();
  },

  setupModel() {
    const model = this.createModel();
    this.el.setObject3D('mesh', model);
  },

  createModel() {
    const sphere = this.createSphere();
    sphere.add(this.createInnerSphere());
    return sphere;
  },

  createSphere() {
    const geometry = new THREE.SphereGeometry( 0.05, 36, 18 );
    const material = new THREE.MeshBasicMaterial( { color: '#0475fe', transparent: true, opacity: 0.5 } );
    return new THREE.Mesh(geometry, material);
  },

  createInnerSphere() {
    const innerGeometry = new THREE.DodecahedronGeometry( 0.01, 0 );
    const innerMaterial = new THREE.MeshBasicMaterial( { color: '#1086ff' } );
    return new THREE.Mesh(innerGeometry, innerMaterial);
  }
};

registerComponent('stick-target', componentDef);
