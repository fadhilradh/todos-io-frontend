const AUTH_STORAGE_KEY = "app-login";

export function persistTokenData(tokenData) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokenData));
}

export function getTokenData() {
  return JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY)) ?? {};
}
