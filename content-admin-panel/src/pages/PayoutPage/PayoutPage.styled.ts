import { Badge } from "@salutejs/plasma-web";
import styled from "styled-components";
import { Button } from "../../components/Button/Button.styled";
import { accent, blackTertiary } from "@salutejs/plasma-tokens";
import { TextFieldGrey } from "../../components/TextField/TextField";

export const StyledRoot = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 20px;
    padding: 0px 50px;
    margin-top: 20px;
    overflow-y: scroll;
`;

export const TitleBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledSaveButton = styled(Button)`
    height: 25px !important;
    padding: 17px 25px;
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
    overflow-y: scroll;
    padding-right: 10px;
`;

export const StyledButtons = styled.div`
    display: flex;
    column-gap: 20px;
`;

export const StyledBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    max-width: 350px;
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
    font-size: 16px;
    font-weight: 600;
`;

export const StyledTextField = styled(TextFieldGrey)`
    width: 320px;

    & label {
        font-weight: 550 !important;
    }
`;

export const StyledBill = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
   
   & a {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
   }
`;