import { Badge, Select } from "@salutejs/plasma-web";
import styled from "styled-components";
import { Button } from "../../components/Button/Button.styled";
import { accent, blackTertiary } from "@salutejs/plasma-tokens";

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 35px;
    padding: 30px;
    margin-top: 50px;
    height: 100vh;
`;

export const StyledSelect = styled(Select)`
    width: 350px;

    & label {
        font-weight: 550 !important;
    }
`;

export const StyledSaveButton = styled(Button)`
    height: 40px;
    padding: 20px 40px;
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
    column-gap: 70px;
`;

export const StyledButtons = styled.div`
    display: flex;
    column-gap: 30px;
`;

export const StyledBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`;

export const StyledBadge = styled(Badge)`
    border-radius: 16px;
    height: 35px;
    padding: 10px 20px;
    font-weight: 600;
`;

export const Icon = styled.img`
    width: 30px;
`;

export const Row = styled.div`
    display: flex;
    column-gap: 5px;
    align-items: center;

    & div {
        font-weight: 500;
    }
`;

export const Course = styled.div`
    color: ${accent};
    font-size: 18px;
    font-weight: 600;
    text-decoration: underline;
`;