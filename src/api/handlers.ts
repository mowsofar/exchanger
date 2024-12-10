function handleResponse(response: Response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function requestToApi(
    endpoint: string,
    body?: unknown,
    options?: Partial<RequestInit>,
) {
    const requestOptions: RequestInit = {
        ...options,
        method: options?.method ?? 'POST',
        credentials: options?.credentials ?? 'include',
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    return fetch(`http://85.192.29.138:8080/${endpoint}`, requestOptions).then(handleResponse);
}