import { Modal } from '@salutejs/plasma-web';
import styled from 'styled-components';
import { TextFieldGrey } from '../TextField/TextField';

export const Content = styled.div`
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
`;

export const StyledTextField = styled(TextFieldGrey)`
    width: 100%;
`;

export const StyledModal = styled(Modal)`
    width: 450px;
`;
