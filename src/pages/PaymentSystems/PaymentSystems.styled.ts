import { Headline3 } from '@salutejs/plasma-web';
import styled from 'styled-components';
import { TableHeader, TableRow, TableWrapper as TableWrapperBase } from '../../components/Table/Table';

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 250px 350px;
    padding: 0 16px;

    cursor: pointer;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 250px 350px;
    padding: 0 16px;
    padding-right: 23px;
`;

export const Title = styled(Headline3)`
    margin: 20px 20px;
`;

export const TableWrapper = styled(TableWrapperBase)`
    margin-left: 20px;
`;
