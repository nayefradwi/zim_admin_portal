import type { Token } from ".";

const accessTokenKey = 'accessToken';
const refreshTokenKey = "refreshToken";

export function storeTokensInSession(token: Token): boolean {
    try {
        const { accessToken, refreshToken } = token;
        sessionStorage.setItem(accessTokenKey, accessToken);
        sessionStorage.setItem(refreshTokenKey, refreshToken);
        return true;
    } catch (_) {
        console.error('Session storage is not supported.');
        return false;
    }

}

export function getTokensFromSession(): Token | null {
    try {
        const accessToken = sessionStorage.getItem(accessTokenKey);
        const refreshToken = sessionStorage.getItem(refreshTokenKey);
        return {
            accessToken: accessToken as string,
            refreshToken: refreshToken as string,
        };
    } catch (_) {
        console.error('Session storage is not supported.');
        return null;
    }
}

