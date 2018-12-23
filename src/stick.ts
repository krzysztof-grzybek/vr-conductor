import {registerComponent, THREE } from 'aframe';
import { ComponentDef } from './utils';


interface StickComponent {
  appendBody: () => void;
  appendPointer: () => void;
  createPointer: () => THREE.Mesh;
  createBody: () => THREE.Mesh;
}

const componentDef: ComponentDef<StickComponent> = {
  data: {
    conductorSelector: {
      type: 'string',
      default: ''
    }
  },

  init() {
    this.appendBody();
    this.appendPointer();
  },

  appendBody() {
    const body = this.createBody();
    this.el.setObject3D('body', body);
  },

  appendPointer() {
    const pointer = this.createPointer();
    this.el.setObject3D('mesh', pointer);
  },

  createBody() {
    const innerGeometry = new THREE.CylinderGeometry( 0.005, 0.005, 0.1, 15, 1 );
    const innerMaterial = new THREE.MeshBasicMaterial( { color: '#fff' } );
    return new THREE.Mesh(innerGeometry, innerMaterial);
  },

  createPointer() {
    const innerGeometry = new THREE.DodecahedronGeometry( 0.08, 0 );
    const innerMaterial = new THREE.MeshBasicMaterial( { color: '#1086ff' } );
    return new THREE.Mesh(innerGeometry, innerMaterial);
  }
};

registerComponent('stick', componentDef);
