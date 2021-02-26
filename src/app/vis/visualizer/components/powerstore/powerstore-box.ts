import * as THREE from 'three';
import {Mesh} from 'three';

export class PowerstoreBox extends Mesh {

  constructor() {
    super(new THREE.BoxGeometry(200, 100, 100));
  }
}
