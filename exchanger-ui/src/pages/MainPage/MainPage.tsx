import { ExchangeModal } from '../../components/ExchangeModal/ExchangeModal';
import { Shade1, Shade2, Shade3, StyledDescription, StyledLayout } from './MainPage.styled';

export const MainPage: React.FC = () => {
    return (
        <StyledLayout>
            <Shade1 src="/images/shade1.png" alt="shade1" />
            <Shade2 src="/images/shade2.png" alt="shade2" />
            <Shade3 src="/images/shade3.png" alt="shade3" />
            <StyledDescription>Обменивайте быстро, безопасно и выгодно</StyledDescription>
            <ExchangeModal />
        </StyledLayout>
    );
};
