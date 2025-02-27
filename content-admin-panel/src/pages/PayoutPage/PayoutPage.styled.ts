import { Badge, Select, TextField } from "@salutejs/plasma-web";
import styled from "styled-components";
import { Button } from "../../components/Button/Button.styled";
import { blackTertiary } from "@salutejs/plasma-tokens";

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    padding: 30px;
    height: 100vh;
`;

export const StyledSelect = styled(Select)`
    width: 350px;

    & label {
        font-weight: 550 !important;
    }
`;

export const StyledTextField = styled(TextField)`
    width: 350px;

    & label {
        font-weight: 550 !important;
    }
`;

export const StyledSaveButton = styled(Button)`
    width: 160px !important;
    height: 40px;
`;

export const StyledLine = styled.div`
    border-width: 1px;
    border-style: solid;
    -webkit-border-image: 
      -webkit-gradient(linear, 0 100%, 0 0, from(${blackTertiary}), to(rgba(0, 0, 0, 0))) 1 50%;
    -webkit-border-image: 
      -webkit-linear-gradient(bottom, ${blackTertiary}, rgba(0, 0, 0, 0)) 1 50%;
    -moz-border-image:
      -moz-linear-gradient(bottom, ${blackTertiary}, rgba(0, 0, 0, 0)) 1 50%;  
    -o-border-image:
      -o-linear-gradient(bottom, ${blackTertiary}, rgba(0, 0, 0, 0)) 1 50%;
    border-image:
      linear-gradient(to top, ${blackTertiary}, rgba(0, 0, 0, 0)) 1 50%;
`;

export const StyledTwoBlocks = styled.div`
    display: flex;
    column-gap: 60px;
`;

export const StyledBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

export const StyledBadge = styled(Badge)`
    border-radius: 18px;
    height: 35px;
    padding: 10px 20px;
    font-weight: 600;
`;