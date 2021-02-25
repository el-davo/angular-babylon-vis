import {AfterViewInit, Component, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements AfterViewInit {

  @ViewChild('container') container: any;
  @ViewChild('rendererContainer') rendererContainer: any;

  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  geometry = new THREE.BoxGeometry(200, 200, 200);
  material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
  mesh = new THREE.Mesh(this.geometry, this.material);

  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    this.scene.add(this.mesh);
  }

  ngAfterViewInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setSize(this.container.nativeElement.offsetWidth, this.container.nativeElement.offsetHeight);

    this.animate();
  }

  animate(): void {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

}
