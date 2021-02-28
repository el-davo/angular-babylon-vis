import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisComponent} from './vis.component';
import {RouterModule, Routes} from '@angular/router';
import {VisualizerComponent} from './visualizer/visualizer.component';
import {TableComponent} from './table/table.component';
import {reducer} from './store/vis.reducer';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {VisEffects} from './store/vis.effects';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {VisService} from './vis.service';

const routes: Routes = [
  {
    path: '',
    component: VisComponent
  }
];

@NgModule({
  declarations: [VisComponent, VisualizerComponent, TableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('vis', reducer),
    EffectsModule.forFeature([VisEffects])
  ],
  providers: [
    VisService,
    {
      provide: WebGLRenderer,
      useValue: new WebGLRenderer({antialias: true})
    },
    {
      provide: Scene,
      useValue: new Scene()
    },
    {
      provide: PerspectiveCamera,
      useValue: new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500)
    }
  ]
})

export class VisModule {
}
