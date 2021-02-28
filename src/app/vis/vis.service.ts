import {Injectable} from '@angular/core';
import {Box3, PerspectiveCamera, Scene, Vector3} from 'three';

@Injectable()
export class VisService {

  constructor(private scene: Scene, private camera: PerspectiveCamera) {
  }

  fitCameraToObject(object: any, offset = 0.25): void {
    offset = offset || 1.5;

    const boundingBox = new Box3();

    boundingBox.setFromObject(object);

    const center = boundingBox.getCenter(new Vector3());
    const size = boundingBox.getSize(new Vector3());

    const startDistance = center.distanceTo(this.camera.position);
    const endDistance = this.camera.aspect > 1 ?
      ((size.y / 2) + offset) / Math.abs(Math.tan(this.camera.fov / 2)) :
      ((size.y / 2) + offset) / Math.abs(Math.tan(this.camera.fov / 2)) / this.camera.aspect;

    this.camera.position.set(
      this.camera.position.x * endDistance / startDistance,
      this.camera.position.y * endDistance / startDistance,
      this.camera.position.z * endDistance / startDistance,
    );
    this.camera.lookAt(center);
  }
}
