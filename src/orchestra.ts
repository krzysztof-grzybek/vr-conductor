import { Entity, registerComponent } from 'aframe';
import { ComponentDef } from './utils';


interface OrchestraComponent {
  conductor: Entity | null;
  setup: () => void;
}

const componentDef: ComponentDef<OrchestraComponent> = {
  conductor: null,
  data: {
    conductorSelector: {
      type: 'string',
      default: ''
    }
  },

  init() {
    this.el.sceneEl!.addEventListener('loaded', this.setup.bind(this));
  },

  setup() {
    this.conductor = this.el.sceneEl!.querySelector('[conductor]') as Entity;
    this.conductor.addEventListener('conduct', () => {
      console.log('play')
    });
  }
};

registerComponent('orchestra', componentDef);
