import { Entity, THREE, registerComponent } from 'aframe';
import { ComponentDef } from './utils';

type bowDirection = 'down' | 'up';

interface MusicComponent {
  orchestra: Entity | null;
  nextBowDirection: bowDirection;
  setup: () => void;
  nextMove: () => void;
  groupArm: () => void;
}

const componentDef: ComponentDef<MusicComponent, {}> = {
  nextBowDirection: 'down',
  orchestra: null,

  init() {
    this.el.sceneEl!.addEventListener('loaded', this.setup.bind(this));
  },

  setup() {
    this.orchestra = this.el.sceneEl!.querySelector('[orchestra]') as Entity;
    this.orchestra.addEventListener('play', this.nextMove.bind(this));

    this.el.setAttribute('sound', { src: '#sound' });
    if (this.el.hasAttribute('data-arm-main')) {
      this.groupArm();
    }
  },

  nextMove() {
    this.el.emit(`${this.nextBowDirection}-bow`);

    if (this.nextBowDirection === 'down') {
      this.nextBowDirection = 'up';
    } else {
      this.nextBowDirection = 'down';
    }
  },

  groupArm() {
  // TODO: handle this properely
    const parts = this.orchestra!.querySelectorAll('[data-arm-part]') as NodeListOf<Entity>;
    let prevGroup = this.el.object3D;
    Array.from(parts).forEach((part, i) => {

      if (i ==1) {
        part.object3D.position.set(0.25, 0.15, -0.08);
        prevGroup.add(part.object3D);
        prevGroup = part.object3D;
      } else if (i === 0) {
        prevGroup.add(part.object3D);
        prevGroup = part.object3D;
      }
    });
  }
};

registerComponent('arm', componentDef);
