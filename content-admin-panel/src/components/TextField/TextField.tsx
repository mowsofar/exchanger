import styled from 'styled-components';
import { TextField as TextFieldPlasma } from '@salutejs/plasma-web';
import { blackSecondary, buttonSecondary } from '@salutejs/plasma-tokens';

export const TextField = styled(TextFieldPlasma)`
    & div > div {
        font-weight: 600;
    }

    & input {
        position: relative;
        box-shadow: ${({ status }) => status !== 'error' && 'none'};

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus {
            transition: background-color 5000s ease-in-out 0s;
        }
    }
`;

export const TextFieldGrey = styled(TextFieldPlasma)`
    position: relative;

    > div:last-child {
        background-color: ${buttonSecondary};
        box-shadow: none;
        height: 68px;
        border-radius: 16px;
    }

    > div:first-child {
        position: absolute;
        top: 9px;
        left: 15px;
        font-weight: 600;
        font-size: 14px;
    }

    & label {
        color: ${blackSecondary} !important;
    }

    & input {
        padding-top: 20px;
    }

    > div:last-child > div > div > div {
        top: 20px;
    }
`;
