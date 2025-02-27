import { Modal, TextField } from "@salutejs/plasma-web";
import styled from "styled-components";

export const Content = styled.div`
    height: 280px;
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    > div {
        font-weight: 550;
    }
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
`;

export const StyledModal = styled(Modal)`
    width: 450px;
`;
