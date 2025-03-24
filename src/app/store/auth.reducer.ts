import { createReducer, on } from '@ngrx/store';
import { saveUser } from './auth.actions';
import { jwtDecode } from 'jwt-decode';
const initialState = {};

export const authReducer = createReducer(
  initialState,
  on(saveUser, (state, action) => {
    if (localStorage.getItem('userToken')) {
      // state = jwtDecode(localStorage.getItem('userToken')!);
      state = action.value;
    }
    return state;
  })
);
