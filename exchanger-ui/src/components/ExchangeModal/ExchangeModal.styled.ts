import styled from "styled-components";
import { Button } from "../Button/Button";

export const StyledModal = styled.div`
    background-color: var(--backgroundSecondary);
    height: 500px;
    width: 700px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    border-radius: 40px;
    padding: 40px 20px;
`;

export const StyledHeader = styled.div`
    color: white;
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
`;

export const StyledButton = styled(Button)`
    margin-top: 30px;
`;