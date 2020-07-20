/// local/session storage helpers

export function getLocalStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

export function setLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

export function removeLocalStorage(key: string) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

export function getSessionStorage(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

export function setSessionStorage(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

export function removeSessionStorage(key: string) {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}
