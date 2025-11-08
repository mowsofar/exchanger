import styled from 'styled-components';
import { Badge, Select } from '@salutejs/plasma-web';
import { blackSecondary, success, surfaceLiquid02, surfaceSolid02, surfaceSolid03 } from '@salutejs/plasma-tokens';
import { Button } from '../../components/Button/Button.styled';

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 30px;
    height: calc(100% - 60px);
`;

export const StyledHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    height: 35px;
    font-weight: 600;
    border-radius: 12px;
`;

export const StyledBadge = styled(Badge)`
    border-radius: 18px;
    height: 35px;
    font-weight: 600;
    padding: 10px 15px;
`;

export const StyledCurrency = styled.div<{ isTarget?: boolean }>`
    display: flex;
    flex-direction: column;
    row-gap: 7px;
    align-items: center;

    > div:first-child {
        font-weight: 600;
    }

    ${({ isTarget }) => (isTarget ? `color: ${success};` : '')}
`;

export const StyledSelect = styled(Select)`
    width: 250px;
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

export const SpinnerWrapper = styled(Plug)`
    background-color: ${surfaceLiquid02};
    margin: 0 -30px;
    width: auto;
`;

export const PayoutsList = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    row-gap: 20px;
    overflow-y: scroll;
    margin: 0 -30px;
    padding: 20px;
    border-bottom: 1px solid ${surfaceSolid03};
    background-color: ${surfaceLiquid02};
`;

export const StyledFooter = styled.div`
    display: flex;
    min-height: 100px;
    align-items: center;
    margin-bottom: -30px;
    margin-top: -20px;
`;
