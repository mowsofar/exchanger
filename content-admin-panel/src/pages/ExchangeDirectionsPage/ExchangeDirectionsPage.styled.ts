import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';
import { Paging } from '../../components/Paging/Paging';
import { blackSecondary, surfaceSolid02 } from '@salutejs/plasma-tokens';

export const StyledRoot = styled.div`
    width: 100%;
    height: 100%;
`;

export const StyledContent = styled.div`
    height: calc(100% - 60px);
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
    border-radius: 5px;
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

export const StyledFooter = styled.div`
    display: flex;
    min-height: 100px;
    align-items: center;
    margin-bottom: -30px;
    margin-top: -20px;
`;

export const StyledPaging = styled(Paging)`
    align-self: flex-start;
`;

export const Plug = styled.div`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    color: ${blackSecondary};
    background-color: ${surfaceSolid02};
`;