import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';
import { Paging } from '../../components/Paging/Paging';

export const StyledRoot = styled.div`
    width: 100%;
    height: 100%;
`;

export const StyledContent = styled.div`
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 30px;
`;

export const StyledButtons = styled.div`
    display: flex;
    column-gap: 20px;
`;

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 1fr 200px 200px 200px 60px 60px;
    padding: 0 16px;
    height: 60px;
    
    > div {
        height: 60px;
    }
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 1fr 200px 200px 200px 60px 60px;
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

export const StyledPaging = styled(Paging)`
    align-self: flex-start;
`;