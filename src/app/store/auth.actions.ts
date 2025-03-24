import { createAction, props } from '@ngrx/store';
import { TokenData } from '../core/interfaces/tokenData';

export const saveUser = createAction(
  '[Auth] saveUser',
  props<{ value: TokenData }>()
);
