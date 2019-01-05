import {registerComponent, THREE } from 'aframe';
import { ComponentDef } from './utils';


interface StickComponent {
  appendBody: () => void;
  appendPointer: () => void;
  createPointer: () => THREE.Mesh;
  createBody: () => THREE.Mesh;
}

const componentDef: ComponentDef<StickComponent, { conductorSelector: string, hand: string }> = {
  schema: {
    conductorSelector: {
      type: 'string',
      default: ''
    },
    hand: {
      type: 'string',
      default: 'left',
    }
  },

  init() {
    this.el.setAttribute('vive-controls', { hand: this.data.hand, model: false });

    this.appendBody();
    this.appendPointer();
  },

  appendBody() {
    const body = this.createBody();
    this.el.setObject3D('body', body);
  },

  appendPointer() {
    const pointer = this.createPointer();
    pointer.visible = false;
    this.el.setObject3D('mesh', pointer);
  },

  createBody() {
    const innerGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.1, 15, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({ color: '#fff' });
    const mesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mesh.rotation.set(THREE.Math.degToRad(90), 0, 0);
    mesh.position.z = 0.05;

    const coneGeometry = new THREE.ConeGeometry( 0.0051, 0.05, 6 );
    const coneMesh = new THREE.Mesh(coneGeometry, innerMaterial);
    coneMesh.rotation.set( 0, 0 ,THREE.Math.degToRad(180), );
    coneMesh.position.y = -0.075;
    mesh.add(coneMesh);
    return mesh;
  },

  createPointer() {
    const innerGeometry = new THREE.DodecahedronGeometry( 0.02, 0 );
    const innerMaterial = new THREE.MeshBasicMaterial({ color: '#1086ff', transparent: true, opacity: 0.4 });
    return new THREE.Mesh(innerGeometry, innerMaterial);
  }
};

registerComponent('stick', componentDef);
