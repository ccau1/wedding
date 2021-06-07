import { parseCookies } from "nookies";

export const getAccessToken = (): string | null => {
  const cookies = parseCookies();
  return cookies.accessToken ?? null;
};

export const getCurrentUser = (): User | null => {
  const cookies = parseCookies();
  return cookies.user ? JSON.parse(cookies.user) : null;
};

export const getAuthHeaders = (): { Authorization?: string } => {
  const accessToken = getAccessToken();
  return {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};
