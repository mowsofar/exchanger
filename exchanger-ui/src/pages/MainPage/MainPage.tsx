import React from 'react';
import { ExchangeModal } from '../../components/ExchangeModal/ExchangeModal';
import { useMainPage } from './MainPage.hooks';
import {
    Column,
    ContentWrapper,
    Description,
    FooterContainer,
    Img,
    Link,
    PageWrapper,
    Partner,
    PartnersContainer,
    Row,
    StyledDescription,
    StyledFooter,
    StyledLayout,
} from './MainPage.styled';

export const MainPage: React.FC = () => {
    const {
        getExchangeCourse,
        setSourceCurrency,
        setTargetCurrency,
        handleChangeCurrencies,
        error,
        setError,
        isLoading,
        isLoadingTargetCurrency,
    } = useMainPage();

    return (
        <PageWrapper>
            <head>
                <title>Кукушка - надёжный обменник криптовалют</title>
            </head>

            <ContentWrapper>
                <StyledLayout>
                    <StyledDescription>Обменивайте быстро, безопасно и выгодно</StyledDescription>
                    <ExchangeModal
                        isLoading={isLoading}
                        isLoadingTargetCurrency={isLoadingTargetCurrency}
                        getExchangeCourse={getExchangeCourse}
                        setSourceCurrency={setSourceCurrency}
                        setTargetCurrency={setTargetCurrency}
                        handleChangeCurrencies={handleChangeCurrencies}
                        error={error}
                        setError={setError}
                    />
                </StyledLayout>
            </ContentWrapper>

            <StyledFooter>
                <FooterContainer>
                    <Row>
                        <Link href="https://exnode.ru" target="_blank">
                            <Partner src="images/monitorings/exnode1.png" />
                        </Link>
                        <Link href="https://bestchange.ru" target="_blank">
                            <Partner src="images/monitorings/bestchange1.png" style={{ height: '2rem' }} />
                        </Link>
                    </Row>

                    <Row>
                        <Link href="mailto:helpkykyshka@gmail.com" target="_blank">
                            helpkykyshka@gmail.com
                        </Link>
                        <Link href="https://t.me/HelpKykyshka" target="_blank">
                            <Img src="images/tg.png" />
                        </Link>
                    </Row>
                </FooterContainer>
                <PartnersContainer style={{ justifyContent: 'flexStart' }}>
                    <Row>
                        <Img src="images/logo.png" />
                        <Description>
                            © {new Date().getFullYear()} Кукушка - обменник криптовалют. Все права защищены.
                        </Description>
                    </Row>
                </PartnersContainer>
            </StyledFooter>
        </PageWrapper>
    );
};
