import type { Token } from ".";

export function setWarehouseSelected(warehouseId: number): void {
  try {
    localStorage.setItem("warehouseId", warehouseId.toString());
  } catch (_) {
    console.error("Local storage is not supported.");
  }
}

export function getWarehouseSelected(): number | null {
  try {
    const warehouseId = localStorage.getItem("warehouseId");
    return warehouseId ? parseInt(warehouseId) : null;
  } catch (_) {
    console.error("Local storage is not supported.");
    return null;
  }
}

export const accessTokenKey = "accessToken";
export const refreshTokenKey = "refreshToken";

export function storeTokensInSession(token: Token): boolean {
  try {
    const { accessToken, refreshToken } = token;
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
    return true;
  } catch (e) {
    console.error("Session storage is not supported.", e);
    return false;
  }
}

export function getTokensFromSession(): Token | null {
  try {
    const accessToken = localStorage.getItem(accessTokenKey);
    const refreshToken = localStorage.getItem(refreshTokenKey);
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
