import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    padding: 30px;
`;

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 250px 350px;
    padding: 0 16px;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 250px 350px;
    padding: 0 16px;
    padding-right: 23px;
`;