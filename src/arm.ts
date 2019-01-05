import { Entity, THREE, registerComponent } from 'aframe';
import { ComponentDef } from './utils';

type bowDirection = 'down' | 'up';

interface MusicComponent {
  orchestra: Entity | null;
  armParts: Entity[];
  nextBowDirection: bowDirection;
  setup: () => void;
  nextMove: () => void;
  buildArm: () => void;
}

const componentDef: ComponentDef<MusicComponent, {}> = {
  nextBowDirection: 'down',
  orchestra: null,
  armParts: [],

  init() {
    this.el.sceneEl!.addEventListener('loaded', this.setup.bind(this));
  },

  setup() {
    this.orchestra = this.el.sceneEl!.querySelector('[orchestra]') as Entity;
    this.armParts = Array.from(this.orchestra!.querySelectorAll('[data-arm-part]') as NodeListOf<Entity>);
    this.orchestra.addEventListener('play', this.nextMove.bind(this));

    this.el.setAttribute('sound', { src: '#sound' });

    // TODO: change to superthingloaded event
    setTimeout(() => {
      this.buildArm();
    }, 1000);
  },

  nextMove() {
    this.el.emit(`${this.nextBowDirection}-bow`);
    this.armParts.forEach(part => {
      part.emit(`${this.nextBowDirection}-bow`);
    });

    if (this.nextBowDirection === 'down') {
      this.nextBowDirection = 'up';
    } else {
      this.nextBowDirection = 'down';
    }
  },

  buildArm() {
    let prevGroup = this.el.object3D;
    let originVector: THREE.Vector3;


    this.armParts.forEach((part, i) => {

      if (i === 0 ) {
         originVector = new THREE.Vector3(0.15, 0, 0.1);
      } else if (i === 1) {
         originVector = new THREE.Vector3(0, -0.09, -0.08);
      }

      const wrapper = new THREE.Group();

      prevGroup.updateMatrixWorld(true);
      part.object3D.applyMatrix( new THREE.Matrix4().getInverse( prevGroup.matrixWorld ) );
      wrapper.position.copy(part.object3D.position);
      part.object3D.position.set(0, 0, 0);
      wrapper.add(part.object3D);

      part.object3D.position.add(originVector);
      wrapper.position.sub(originVector);

      part.object3D = wrapper;
      // wrapper.add(part.object3D);
      prevGroup.add(wrapper);
      prevGroup = wrapper;
    });
  }
};

registerComponent('arm', componentDef);
