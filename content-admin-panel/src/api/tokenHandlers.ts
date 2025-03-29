import { ROUTES } from "../constants/routes";
import { refreshToken } from "./handlers";

function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    window.location.replace(ROUTES.login);
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
