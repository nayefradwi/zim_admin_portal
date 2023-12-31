import type { Token } from ".";

export const accessTokenKey = "accessToken";
export const refreshTokenKey = "refreshToken";

export function storeTokensInSession(token: Token): boolean {
  try {
    const { accessToken, refreshToken } = token;
    sessionStorage.setItem(accessTokenKey, accessToken);
    sessionStorage.setItem(refreshTokenKey, refreshToken);
    return true;
  } catch (e) {
    console.error("Session storage is not supported.", e);
    return false;
  }
}

export function getTokensFromSession(): Token | null {
  try {
    const accessToken = sessionStorage.getItem(accessTokenKey);
    const refreshToken = sessionStorage.getItem(refreshTokenKey);
    if (!accessToken || !refreshToken) return null;
    return {
      accessToken: accessToken as string,
      refreshToken: refreshToken as string,
    };
  } catch (e) {
    console.error("Session storage is not supported.", e);
    return null;
  }
}
