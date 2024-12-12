import { getLoginData } from "../../api/handlers"

export const passLogin = async ( email: string, password: string, twoFactorCode: string ) => {
    const loginData = await getLoginData(email, password, twoFactorCode);
    console.log(loginData);
    localStorage.setItem('accessToken', loginData.access_token);
}