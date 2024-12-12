import styled from 'styled-components';
import { TextField as TextFieldPlasma } from '@salutejs/plasma-web';

export const TextField = styled(TextFieldPlasma)`
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
