import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';

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
    grid-template-columns: 1fr 300px 300px 60px 60px;
    padding: 0 16px;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 1fr 300px 300px 60px 60px;
    padding: 0 16px;
    padding-right: 23px;
`;

export const Icon = styled.img`
    width: 35px;
    margin-right: 10px;
`;

export const CurrenciesExchangeDirection = styled.div`
    display: flex;
    column-gap: 15px;
    align-items: center;
`;

export const Currency = styled.div`
    display: flex;
    column-gap: 5px;
    align-items: center;
`;