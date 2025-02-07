import { Button } from '../Button/Button';
import { Calculator } from '../Calculator/Calculator';
import { StyledHeader, StyledModal } from './ExchangeModal.styled';

export const ExchangeModal: React.FC = () => {
    return (
        <StyledModal>
            <StyledHeader>Калькулятор</StyledHeader>
            <Calculator />
            <Button>Перейти к вводу реквизитов</Button>
        </StyledModal>
    );
};
