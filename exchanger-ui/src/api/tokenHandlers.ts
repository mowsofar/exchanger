import { ROUTES } from "../constants/routes";
import { refreshToken } from "./handlers";

function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.replace(ROUTES.root);
}

export async function handleTokenRefresh() {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    
    if (!refreshTokenValue) {
      logoutUser();
      
      return;
    }
  
    try {
      await refreshToken();
    } catch (error) {
      logoutUser();
    }
  }
