import { Entity, registerComponent } from 'aframe';
import { CollideEvent } from './collidable';
import { ComponentDef } from './utils';

type targetSide = 'left' | 'right';

interface ConductorComponent {
  lastHitSide: targetSide | null;
  stickTargets: Entity[],
  onStickTargetCollide: (target: CollideEvent) => void;
  conduct: () => void;
  handleHighlights: (side: targetSide) => void;
}

const componentDef: ComponentDef<ConductorComponent, {}> = {
  lastHitSide: null,
  stickTargets: [],

  init() {
    this.stickTargets = Array.from(this.el.querySelectorAll<Entity>('[stick-target]'));

    // TODO: find out why it's needed and remove it (probably collision is fired before setting translations)
    setTimeout(() => {
      this.stickTargets.forEach((el: Entity) => {
        el.addEventListener('collide', this.onStickTargetCollide.bind(this));
      });
    }, 100); 
  },

  onStickTargetCollide(e: CollideEvent) {
    const stickTarget = e.target.components['stick-target'];
    const targetSide = stickTarget.data.name;

    if (
      (this.lastHitSide === null && targetSide === 'left') || // first
      (this.lastHitSide !== null && targetSide !== this.lastHitSide) // every next
    ) {
      this.conduct();
      this.handleHighlights(targetSide);
      this.lastHitSide = targetSide;
    }
  },

  conduct() {
    this.el.emit('conduct');
  },

  handleHighlights(sideToHighlight: targetSide) {
    this.stickTargets.forEach(target => {
      const stickTargetComponent = target.components['stick-target'];
      const targetSide = stickTargetComponent.data.name;

      if (targetSide === sideToHighlight) {
        stickTargetComponent.highlightOn();
      } else {
        stickTargetComponent.highlightOff();
      }
    });
  }
};

registerComponent('conductor', componentDef);
