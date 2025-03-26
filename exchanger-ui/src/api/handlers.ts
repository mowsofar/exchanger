import { handleTokenRefresh } from "./tokenHandlers";
import { Course, Currency, ExchangeDirection, Payout, PayoutStatus, User } from "./types/common";


function handleResponse(response: Response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (response.status === 403) {
            console.log('ss');
            handleTokenRefresh();
        }

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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    return fetch(`https://server.kykyshka.com/${endpoint}`, requestOptions).then(handleResponse);
}

function requestToAccountApi(
    endpoint: string,
) {
    const requestOptions: RequestInit = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    return fetch(`https://server.kykyshka.com/${endpoint}`, requestOptions).then(handleResponse);
}

export async function createPayout(srcCurrencyId: number, targetCurrencyId: number, amountFrom: number, amountTo: number, requisites: string, sourceFields: {fieldId: number, userValue: string}[], targetFields: {fieldId: number, userValue: string}[], course: number, email: string, referralCode: string | null): Promise<Payout> {
    const accessToken = localStorage.getItem('accessToken');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
  
    try {
      const response = await fetch('https://server.kykyshka.com/api/payouts', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ srcCurrencyId, targetCurrencyId, amountFrom, amountTo, requisites, sourceFields, targetFields, course, email, referralCode }),
      });
  
      if (!response.ok) {
        if (response.status === 403) {
            await handleTokenRefresh();
            return createPayout(srcCurrencyId, targetCurrencyId, amountFrom, amountTo, requisites, sourceFields, targetFields, course, email, referralCode);
        }
        
        throw new Error('Request failed');
      }
  
      return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }

export function authenticate(email: string, password: string): Promise<{ access_token: string, refresh_token: string }> {
    return requestToApi('api/v1/auth/authenticate', { method: 'POST' }, { email, password });
}

export function register(firstname: string, lastname: string, email: string, password: string): Promise<unknown> {
    return requestToApi('api/v1/auth/register', { method: 'POST' }, { firstname, lastname, email, password });
}

export function refreshToken(): Promise<unknown> {
    return requestToApi('api/v1/auth/refreshToken', { method: 'POST' });
}

export function getAccount(): Promise<User> {
    return requestToAccountApi('api/user/getaccount');
}

export function getFilteredPayouts(status: PayoutStatus): Promise<Payout[]> {
    return requestToAccountApi(`api/user/payouts?status=${status}`);
}

export function getPayouts(): Promise<Payout[]> {
    return requestToAccountApi('api/user/payouts');
}

export function getLeftColumnCurrencies(): Promise<Currency[]> {
    return requestToApi('api/currencies/from', { method: 'GET' });
}

export function getRightColumnCurrencies(currencyId: number): Promise<Currency[]> {
    return requestToApi(`api/currencies/from/${currencyId}`, { method: 'GET' });
}

export function getCurrency(currencyId: number): Promise<Currency> {
    return requestToApi(`api/currencies/${currencyId}`, { method: 'GET' });
}

export function getExchangeDirections(sourceId: number, targetId: number): Promise<ExchangeDirection> {
    return requestToApi(`api/exchange-directions/admin/${sourceId}/${targetId}`, { method: 'GET' });
}

export function getExchangeDirectionsCourse(sourceId: number, targetId: number): Promise<Course> {
    return requestToApi(`api/exchange-directions/course/${sourceId}/${targetId}`, { method: 'GET' });
}

export function getPayout(id: number): Promise<Payout> {
    return requestToApi(`api/payouts/${id}`, { method: 'GET' });
}

export function setPayoutStatus(id: number
): Promise<Payout> {
    return requestToApi(`api/payouts/${id}/status`, { method: 'PATCH' }, { status: 'WAITING_FOR_OPERATOR_PROCESSING' });
}