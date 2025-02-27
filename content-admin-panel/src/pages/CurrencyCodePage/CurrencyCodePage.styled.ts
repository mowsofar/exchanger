import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    padding: 30px;
    height: 100vh;
`;

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 550px 1fr 60px 60px;
    padding: 0 16px;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 550px 1fr 60px 60px;
    padding: 0 16px;
    padding-right: 23px;
`;