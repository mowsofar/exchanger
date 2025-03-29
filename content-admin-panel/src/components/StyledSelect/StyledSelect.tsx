import { surfaceSolid02 } from '@salutejs/plasma-tokens';
import { Select } from '@salutejs/plasma-web';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
    > div > div > div > div {
        width: 300px;
        height: 45px !important;
        font-weight: 600;
        border-radius: 17px !important;
        box-shadow: none !important;
        background-color: ${surfaceSolid02} !important;
    }

    & svg {
        fill: black !important;
    }
`;
