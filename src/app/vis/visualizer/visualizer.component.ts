import {AmbientLight, HemisphereLight, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer} from 'three';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
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

  mouse = new Vector2();
  raycaster = new Raycaster();

  constructor(private renderer: WebGLRenderer,
              private scene: Scene,
              private camera: PerspectiveCamera,
              private store: Store<ModuleState>) {

    this.camera.position.z = 1000;
  }

  ngAfterViewInit(): void {
    this.renderer.setSize(this.container.nativeElement.offsetWidth, this.container.nativeElement.offsetHeight);
    this.camera.aspect = this.container.nativeElement.offsetWidth / this.container.nativeElement.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setClearColor(0xffffff);
    this.scene.add(new AmbientLight(0x916262, 0.5));
    this.scene.add(new HemisphereLight(0xffffbb, 0x080820, 1));
    new OrbitControls(this.camera, this.renderer.domElement);

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.store.dispatch(actions.loadAsset({url: 'assets/models/powerstore.glb', lookAt: true}));

    this.rendererContainer.nativeElement.addEventListener('mousemove', (event: Event) => this.mouseMove(event));

    this.animate();
  }

  animate(): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      console.log(intersects);
    }

    for (const item of intersects) {
      (item.object as any).material.color.set(0xff0000);
    }

    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  mouseMove(event: any): void {
    this.mouse.x = (event.clientX / this.container.nativeElement.offsetWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.container.nativeElement.offsetHeight) * 2 + 1;
  }

}
