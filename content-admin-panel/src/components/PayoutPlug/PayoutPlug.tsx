import { secondary } from '@salutejs/plasma-tokens';
import { Headline2, ParagraphText1 } from '@salutejs/plasma-web';
import styled from 'styled-components';

const StyledRoot = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
`;

const Img = styled.img`
    height: 200px;
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
                <Img src="images/payout.webp" />
                <Headline2>Выберите заявку</Headline2>
                <Description>Чтобы получить детальную информацию о заявке, выберите ее в левом списке</Description>
            </StyledColumn>
        </StyledRoot>
    );
};
