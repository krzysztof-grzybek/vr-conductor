import { Entity, registerComponent } from 'aframe';
import { CollideEvent } from './collidable';
import { ComponentDef } from './utils';

type targetSide = 'left' | 'right';

interface ConductorComponent {
  lastHitSide: targetSide | null;
  stickTargets: NodeListOf<Entity> | null,
  onStickTargetCollide: (target: CollideEvent) => void;
  conduct: () => void;
}

const componentDef: ComponentDef<ConductorComponent> = {
  lastHitSide: null,
  stickTargets: null,

  init() {
    this.stickTargets = this.el.querySelectorAll<Entity>('[stick-target]');

    this.stickTargets.forEach((el: Entity) => {
      el.addEventListener('collide', this.onStickTargetCollide.bind(this));
    });
  },

  onStickTargetCollide(e: CollideEvent) {
    const targetSide = e.target.getAttribute('stick-target').name;

    // first
    if (this.lastHitSide === null && targetSide === 'left') {
      this.conduct();
      this.lastHitSide = targetSide;
    }

    // every next
    if (this.lastHitSide !== null && targetSide !== this.lastHitSide) {
      this.conduct();
      this.lastHitSide = targetSide;
    }
  },

  conduct() {
    this.el.emit('conduct');
  }
};

registerComponent('conductor', componentDef);
