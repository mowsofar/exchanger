import { ROUTES } from "../constants/routes";
import { refreshToken } from "./handlers";

export function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');

    if (window.location.pathname !== ROUTES.root) {
      window.location.replace(ROUTES.root);
    }
    
}

export async function handleTokenRefresh() {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    
    if (!refreshTokenValue) {
      logoutUser();
      
      return;
    }
  
    try {
      const { access_token, refresh_token } = await refreshToken();

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
    } catch (error) {
      logoutUser();
    }
  }
