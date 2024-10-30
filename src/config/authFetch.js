import { Token } from "@/api";


export async function authFetch(url, params = {}) {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();

  const logout = () => {
    tokenCtrl.removeToken();
    window.location.replace("/");
  };

  if (!token || tokenCtrl.hasExpired(token)) {
    logout();
    return;
  }

  const paramsTemp = {
    ...params,
    headers: {
      ...params.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return await fetch(url, paramsTemp);
  } catch (error) {
    console.error("Fetch error:", error);
    return error;
  }
}