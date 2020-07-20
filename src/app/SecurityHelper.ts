import {environment} from '../environments/environment';
import {getLocalStorage, removeLocalStorage, setLocalStorage} from './shared/StorageUtils';

// oauth helpers
export const oAuthRedirectUri = `${environment.baseURL}/login`;
export const oAuthScope = 'identify guilds';

const redirectUri = encodeURIComponent(oAuthRedirectUri);
const scope = encodeURIComponent(oAuthScope);

/// generates and saves an oauth state to sessionStorage (oauth-state) and returns url of discord oauth
export function navigateToDiscordOauth() {
  // set oauth state in local storage
  // Discord OAuth2 opens a new tab on Android Chrome, so we use localStorage instead of sessionStorage
  const state = generateOauthState();
  setLocalStorage('expected-oauth-state', state);

  // do navigation
  window.location.href = getDiscordOauthUrl(state);
}

export function getDiscordOauthUrl(state: string) {
  // build oauth url based on env
  const queryString = `?client_id=${environment.clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=consent&state=${state}`;
  return `${environment.loginURL}${queryString}`;
}

function generateOauthState() {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map(x => validChars.charCodeAt(x % validChars.length));
  return String.fromCharCode.apply(null, array);
}

// token helpers
export function isLoggedIn() {
  return getToken() != null;
}

export function setToken(token: string) {
  setLocalStorage('avrae-token', token);
}

export function getToken() {
  return getLocalStorage('avrae-token');
}

export function removeToken() {
  removeLocalStorage('avrae-token');
}
