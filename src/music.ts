import { Entity, registerComponent } from 'aframe';
import { ComponentDef } from './utils';


interface MusicComponent {
  orchestra: Entity | null;
  nextNote: () => void;
  setup: () => void;
}

const componentDef: ComponentDef<MusicComponent, {}> = {
  orchestra: null,

  init() {
    this.el.sceneEl!.addEventListener('loaded', this.setup.bind(this));
  },

  setup() {
    this.orchestra = this.el.sceneEl!.querySelector('[orchestra]') as Entity;
    this.orchestra.addEventListener('play', this.nextNote.bind(this));

    this.el.setAttribute('sound', { src: '#sound' });
  },

  nextNote() {
    const soundComponent = this.el.components.sound;
    soundComponent.stopSound();
    soundComponent.playSound();
  }
};

registerComponent('music', componentDef);
