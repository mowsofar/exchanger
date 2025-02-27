import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';
import { Badge } from '@salutejs/plasma-web';
import { success } from '@salutejs/plasma-tokens';
import { Button } from '../../components/Button/Button.styled';

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    padding: 30px;
    height: 100vh;
`;

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 150px 1fr 250px 250px 250px;
    padding: 0 16px;
    cursor: pointer;
    height: 80px;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 150px 1fr 250px 250px 250px;
    padding: 0 16px;
    padding-right: 23px;
`;

export const StyledButton = styled(Button)`
    height: 42px;
`;

export const StyledBadge = styled(Badge)`
    border-radius: 18px;
    height: 35px;
    font-weight: 600;
    padding: 10px 15px;
`;

export const StyledCurrency = styled.div<{isTarget?: boolean}>`
    display: flex;
    flex-direction: column;
    row-gap: 7px;
    align-items: center;
    
    > div:first-child {
        font-weight: 600;
    }

    ${({ isTarget }) => (isTarget ? `color: ${success};` : '')}
`;