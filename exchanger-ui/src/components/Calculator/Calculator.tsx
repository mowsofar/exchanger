import { IconSwapVert } from '@salutejs/plasma-icons';
import { StyledCard, StyledCardName, StyledInput, StyledRoot, SwapButton } from './Calculator.styled';

export const Calculator: React.FC = () => {
    return (
        <StyledRoot>
            <SwapButton>
                <IconSwapVert />
            </SwapButton>
            <StyledCard>
                <StyledCardName>Получаете</StyledCardName>
                <StyledInput />
            </StyledCard>

            <StyledCard>
                <StyledCardName>Отдаёте</StyledCardName>
                <StyledInput />
            </StyledCard>
        </StyledRoot>
    );
};
