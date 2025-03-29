import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';
import { Badge } from '@salutejs/plasma-web';
import { accent } from '@salutejs/plasma-tokens';

export const StyledRoot = styled.div`
    width: 100%;
    height: 100%;
`;

export const StyledContent = styled.div`
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    padding: 30px;
`;

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 350px 1fr 220px 150px 60px 60px;
    padding: 0 16px;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 350px 1fr 220px 150px 60px 60px;
    padding: 0 16px;
    padding-right: 23px;
`;

export const StyledBadge = styled(Badge)`
    border-radius: 18px;
    height: 35px;
    padding: 10px 20px;
    font-weight: 600;
`;

export const Currencies = styled.div`
    color: ${accent};
    overflow: hidden;
    text-overflow: ellipsis;
`;