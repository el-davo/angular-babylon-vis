import {createReducer} from '@ngrx/store';
import {visState} from './vis.state';

export const reducer = createReducer(
  visState
);
