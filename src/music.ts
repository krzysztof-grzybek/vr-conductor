import { Entity, registerComponent } from 'aframe';
import { ComponentDef } from './utils';
import * as song from '../misc/song.json';


interface MusicComponent {
  orchestra: Entity | null;
  nextNote: () => void;
  setup: () => void;
  currentNoteIndex: number;
}

const componentDef: ComponentDef<MusicComponent, {}> = {
  orchestra: null,
  currentNoteIndex: 0,

  init() {
    this.el.sceneEl!.addEventListener('loaded', this.setup.bind(this));
  },

  setup() {
    this.orchestra = this.el.sceneEl!.querySelector('[orchestra]') as Entity;
    this.orchestra.addEventListener('play', this.nextNote.bind(this));

    this.el.setAttribute('sound', { src: '#sound' });
  },

  nextNote() {
    if (song[this.currentNoteIndex]) {
      const soundComponent = this.el.components.sound;
      this.el.setAttribute('sound', { src: `#${song[this.currentNoteIndex]}` });
      soundComponent.stopSound();
      soundComponent.playSound();
      this.currentNoteIndex++;
    }
  }
};

registerComponent('music', componentDef);
