import { Component } from 'aframe';
import { FullComponentDef } from './utils';
import { StickTargetComponent } from './stickTarget';

interface SoundComponent extends Component {
  playSound: () => void;
  stopSound: () => void;
}

declare module 'aframe' {
  interface DefaultComponents {
    sound: SoundComponent;
    'stick-target': FullComponentDef<StickTargetComponent>;
  }
}
