import { blackSecondary, buttonSecondary } from "@salutejs/plasma-tokens";
import { Select as SelectBase } from "@salutejs/plasma-web";
import styled from "styled-components";

export const Select = styled(SelectBase)`
    position: relative;

    & label {
        color: ${blackSecondary} !important;
    }

    > div > div > div > div:last-child {
        background-color: ${buttonSecondary} !important;
        box-shadow: none !important;
        height: 55px !important;
    }
`;