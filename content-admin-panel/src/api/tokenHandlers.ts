import { ROUTES } from "../constants/routes";
import { refreshToken } from "./handlers";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const queue: Array<() => void> = [];

function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    window.location.replace(ROUTES.login);
}
export async function queueTokenRefresh() {
  if (isRefreshing) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      const { access_token, refresh_token } = await refreshToken();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      
      // Выполняем все запросы из очереди
      queue.forEach(cb => cb());
      queue.length = 0;
      resolve();
    } catch (error) {
      queue.length = 0;
      logoutUser();
      reject(error);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  });

  return refreshPromise;
}