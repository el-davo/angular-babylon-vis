import {createAction, props} from '@ngrx/store';

const LOAD_ASSET = 'vis/LOAD_ASSET';

export const loadAsset = createAction(LOAD_ASSET, props<{ url: string, lookAt: boolean }>());
