export function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

export const getToken = (): string => {
  return getCookie('token') ?? '';
};
export const getRefreshToken = (): string => {
  return getCookie('refreshToken') ?? '';
};

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}