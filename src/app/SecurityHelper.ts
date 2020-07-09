import {environment} from '../environments/environment';

// oauth helpers
export const oAuthRedirectUri = `${environment.baseURL}/login`;
export const oAuthScope = 'identify guilds';

const redirectUri = encodeURIComponent(oAuthRedirectUri);
const scope = encodeURIComponent(oAuthScope);

/// generates and saves an oauth state to sessionStorage (oauth-state) and returns url of discord oauth
export function navigateToDiscordOauth() {
  // set oauth state in session storage
  const state = generateOauthState();
  sessionStorage.setItem('oauth-state', state);

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
  localStorage.setItem('avrae-token', token);
}

export function getToken() {
  return localStorage.getItem('avrae-token');
}

export function removeToken() {
  if (localStorage.getItem('avrae-token')) {
    localStorage.removeItem('avrae-token');
  }
}
