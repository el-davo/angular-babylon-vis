import {AmbientLight, HemisphereLight, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {Store} from '@ngrx/store';
import {ModuleState} from '../store/module.state';
import * as actions from '../store/vis.actions';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements AfterViewInit {

  @ViewChild('container') container: any;
  @ViewChild('rendererContainer') rendererContainer: any;

  constructor(private renderer: WebGLRenderer,
              private scene: Scene,
              private camera: PerspectiveCamera,
              private store: Store<ModuleState>) {

    this.camera.position.z = 1000;
  }

  ngAfterViewInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff);
    this.scene.add(new AmbientLight(0x916262, 0.5));
    this.scene.add(new HemisphereLight(0xffffbb, 0x080820, 1));

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setSize(this.container.nativeElement.offsetWidth, this.container.nativeElement.offsetHeight);
    new OrbitControls(this.camera, this.renderer.domElement);

    this.store.dispatch(actions.loadAsset({url: 'assets/models/powerstore.glb', lookAt: true}));

    this.animate();
  }

  animate(): void {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

}
