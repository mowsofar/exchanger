import { ROUTES } from "../constants/routes";
import { LoginData } from "./types/common";

function handleResponse(response: Response) {
    if (response.status === 403) {
        window.location.replace(ROUTES.login);
    }

    if (response.status === 200 && window.location.pathname === ROUTES.login) {
        window.location.replace(ROUTES.paymentSystems);
    }
    
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function requestToApi(
    endpoint: string,
    options: Partial<RequestInit>,
    body?: unknown,
) {
    const requestOptions: RequestInit = {
        ...options,
        method: options?.method,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    console.log(`Bearer ${localStorage.getItem('accessToken')}`);

    return fetch(`http://85.192.29.138:8080/${endpoint}`, requestOptions).then(handleResponse);
}

export function getLoginData(email: string, password: string, twoFactorCode: string
): Promise<LoginData> {
    return requestToApi('api/v1/auth/authenticate', { method: 'POST'}, { email, password, twoFactorCode });
}

export function getPaymentSystems(
): Promise<unknown> {
    return requestToApi('rest/payments', { method: 'GET'});
}

export function getCurrencies(
): Promise<unknown> {
    return requestToApi('rest/currency/getAll', { method: 'GET'});
}
