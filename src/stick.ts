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
    const innerGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 15, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({ color: '#fff' });
    const mesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mesh.rotation.set(THREE.Math.degToRad(90), 0, 0);
    mesh.position.z = 0.05;

    const tipGeometry = new THREE.ConeGeometry( 0.0051, 0.05, 6 );
    const tipMesh = new THREE.Mesh(tipGeometry, innerMaterial);
    tipMesh.rotation.set( 0, 0 ,THREE.Math.degToRad(180), );
    tipMesh.position.y = -0.1;
    mesh.add(tipMesh);

    const woodGeometry = new THREE.CylinderGeometry( 0.0065, 0.01, 0.03 );
    const woodMaterial = new THREE.MeshBasicMaterial({ color: '#823100' });
    const woodMesh = new THREE.Mesh(woodGeometry, woodMaterial);
    woodMesh.rotation.set( 0, 0 ,THREE.Math.degToRad(180), );
    woodMesh.position.y = 0.075;
    mesh.add(woodMesh);

    return mesh;
  },

  createPointer() {
    const innerGeometry = new THREE.DodecahedronGeometry( 0.02, 0 );
    const innerMaterial = new THREE.MeshBasicMaterial({ color: '#1086ff', transparent: true, opacity: 0.4 });
    return new THREE.Mesh(innerGeometry, innerMaterial);
  }
};

registerComponent('stick', componentDef);
