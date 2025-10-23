import styled from 'styled-components';
import { TextArea, TextField as TextFieldPlasma } from '@salutejs/plasma-web';
import { buttonSecondary } from '@salutejs/plasma-tokens';

export const TextField = styled(TextFieldPlasma)``;

export const TextFieldGrey = styled(TextFieldPlasma)``;

export const TextAreaGrey = styled(TextArea)`
    > div {
        background-color: ${buttonSecondary};
        box-shadow: none !important;
        border: none;
        overflow: scroll;
        height: fit-content;
    }

    > div > div:nth-child(2) {
        box-shadow: none !important;
        height: 50px;
        padding-top: 25px !important;
    }

    textarea {
        font-size: 15px !important;
    }

    label {
        font-weight: 600 !important;
        font-size: 12px !important;
        top: 2px;
    }
`;
