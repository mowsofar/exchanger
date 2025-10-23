import { blackSecondary } from '@salutejs/plasma-tokens';
import { Select as SelectBase } from '@salutejs/plasma-web';
import styled from 'styled-components';

export const Select = styled(SelectBase)`
    & ul {
        max-height: 300px;
        overflow-y: scroll;

        ::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 5px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 15px;
            background-color: ${blackSecondary};
        }
    }
`;
