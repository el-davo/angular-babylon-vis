import {Inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import * as actions from './vis.actions';
import {VisService} from '../vis.service';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {from} from 'rxjs';
import {Scene} from 'three';

@Injectable()
export class VisEffects {

  loadAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadAsset),
      mergeMap(({url}) =>
        from(new GLTFLoader().loadAsync(url)).pipe(
          map((asset) => {
            this.scene.add(asset.scene);
            this.visService.fitCameraToObject(asset.scene);
          })
        )
      )
    ), {dispatch: false});

  constructor(
    private scene: Scene,
    private visService: VisService,
    private actions$: Actions
  ) {
  }
}
