import { TokenData } from '../core/interfaces/tokenData';

export const authSelector = (state: { auth: TokenData }) => state.auth;
