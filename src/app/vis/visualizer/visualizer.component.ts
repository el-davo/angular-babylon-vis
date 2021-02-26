import {AfterViewInit, Component, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {VisService} from '../vis.service';

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
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1);
  loader = new GLTFLoader();

  constructor(private visService: VisService) {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
    this.camera.position.z = 1000;
  }

  ngAfterViewInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setSize(this.container.nativeElement.offsetWidth, this.container.nativeElement.offsetHeight);
    new OrbitControls(this.camera, this.renderer.domElement);

    this.loader.load('assets/models/powerstore.glb', (gltf) => {
      this.scene.add(gltf.scene);
      this.visService.fitCameraToObject(this.camera, gltf.scene);
    }, undefined, (error) => {
      console.error(error);
    });

    this.animate();
  }

  animate(): void {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

}
