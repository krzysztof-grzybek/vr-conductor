import { Entity, registerComponent } from 'aframe';
import { ComponentDef } from './utils';

type bowDirection = 'down' | 'up';

interface MusicComponent {
  orchestra: Entity | null;
  nextBowDirection: bowDirection;
  setup: () => void;
  nextMove: () => void;
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
  },

  nextMove() {
    this.el.emit(`${this.nextBowDirection}-bow`);

    if (this.nextBowDirection === 'down') {
      this.nextBowDirection = 'up';
    } else {
      this.nextBowDirection = 'down';
    }
  },
};

registerComponent('arm', componentDef);
