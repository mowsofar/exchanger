import { secondary, surfaceLiquid02 } from '@salutejs/plasma-tokens';
import { ParagraphText1 } from '@salutejs/plasma-web';
import styled from 'styled-components';
import logo from './images/payouticon.png';

const StyledRoot = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    background-color: ${surfaceLiquid02};
    margin: 0 -30px;
`;

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    align-items: center;
`;

const Img = styled.img`
    height: 100px;
    object-fit: contain;
`;

const Description = styled(ParagraphText1)`
    color: ${secondary};
    max-width: 350px;
    font-size: 20px;
    text-align: center;
`;

export const PayoutPlug = () => {
    return (
        <StyledRoot>
            <StyledColumn>
                <Img src={logo} />
                <Description>Нет доступных заявок</Description>
            </StyledColumn>
        </StyledRoot>
    );
};
