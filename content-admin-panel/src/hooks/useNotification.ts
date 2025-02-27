import { addNotification } from '@salutejs/plasma-web';
import React from 'react';

type ShowNotification = {
    (text: string, type?: 'success' | 'warning'): void;
    (text: string, type: 'error', error: unknown): void;
};

export function useNotification() {
    const showNotification = React.useCallback<ShowNotification>(
        (text: string, type?: 'success' | 'warning' | 'error', error?: unknown) => {

            addNotification(
                {
                    title: text,
                    style: {
                        color: type === 'error' ? 'red' : 'green'
                    }
                },
                3500,
            );

            if (type === 'error') {
                console.log(text, { error });
            }
        },
        [],
    );

    return showNotification;
}
