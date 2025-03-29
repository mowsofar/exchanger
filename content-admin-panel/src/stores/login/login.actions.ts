import { getAccount, getLoginData } from "../../api/handlers"

export const passLogin = async ( email: string, password: string, twoFactorCode: string ) => {
    const loginData = await getLoginData(email, password, twoFactorCode);
    localStorage.setItem('accessToken', loginData.access_token);
    localStorage.setItem('refreshToken', loginData.refresh_token);

    const user = await getAccount();
    localStorage.setItem('firstName', user?.firstname);
    localStorage.setItem('lastName', user?.lastname);
    localStorage.setItem('email', user?.email);
}