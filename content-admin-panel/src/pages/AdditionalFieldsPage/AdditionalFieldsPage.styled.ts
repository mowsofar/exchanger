import styled from 'styled-components';
import { TableHeader, TableRow } from '../../components/Table/Table';
import { Badge } from '@salutejs/plasma-web';
import { Button } from '@salutejs/plasma-ui';
import { blackSecondary, surfaceSolid02 } from '@salutejs/plasma-tokens';
import { StyledSelect } from '../../components/StyledSelect/StyledSelect';

export const StyledRoot = styled.div`
    width: 100%;
    height: 100%;
`;

export const StyledContent = styled.div`
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 30px;
`;

export const StyledTableRow = styled(TableRow)`
    grid-template-columns: 350px 1fr 220px 150px 150px 60px 60px;
    padding: 0 16px;
`;

export const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 350px 1fr 220px 150px 150px 60px 60px;
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
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Header = styled.div`
    display: flex;
    column-gap: 20px;
`;

export const StyledButton = styled(Button)`
    width: fit-content;
`;

export const Select = styled(StyledSelect)`
    > div > div > div > div {
        width: 250px;
        height: 40px !important;
        font-weight: 600;
        font-size: 14px;
        border-radius: 12px !important;
        box-shadow: none !important;
        background-color: ${surfaceSolid02} !important;
    }
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
