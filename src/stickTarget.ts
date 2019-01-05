import { registerComponent, THREE } from 'aframe';
import { ComponentDef } from './utils';
import { Mesh, MeshBasicMaterial } from 'three';

export interface StickTargetComponent {
  setupModel: () => void;
  createModel: () => THREE.Mesh;
  createSphere: () => THREE.Mesh;
  createInnerSphere: () => THREE.Mesh;
  highlightOn: () => void;
  highlightOff: () => void;
  setColor: (color: string) => void;
}

const BASIC_COLOR = '#888';

const componentDef: ComponentDef<StickTargetComponent, { name: string }> = {
  schema: {
    name: {
      type: 'string',
      default: '',
    }
  },

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
    const geometry = new THREE.SphereGeometry(0.05, 36, 18);
    const material = new THREE.MeshBasicMaterial({ color: '#0475fe', transparent: true, opacity: 0.1 });
    return new THREE.Mesh(geometry, material);
  },

  createInnerSphere() {
    const innerGeometry = new THREE.DodecahedronGeometry(0.01, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({ color: BASIC_COLOR });
    return new THREE.Mesh(innerGeometry, innerMaterial);
  },

  highlightOn() {
    this.setColor('#fff');
  },

  highlightOff() {
    this.setColor(BASIC_COLOR);
  },

  setColor(color: string) {
    const mesh = this.el.getObject3D('mesh') as Mesh;
    const material = mesh.material as MeshBasicMaterial;
    material.color.set(color);
  }

};

registerComponent('stick-target', componentDef);
