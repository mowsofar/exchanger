import React from 'react';
import { ExchangeModal } from '../../components/ExchangeModal/ExchangeModal';
import { useMainPage } from './MainPage.hooks';
import {
    Badge,
    ContentWrapper,
    Description,
    DescriptionColumn,
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
import { IconTimerOutline } from '@salutejs/plasma-icons';

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
                <title>Кукушка — надёжный обменник криптовалют</title>
            </head>

            <ContentWrapper>
                <StyledLayout>
                    <DescriptionColumn>
                        <StyledDescription>
                            Надёжный сервис: обменяйте средства с комфортом, безопасностью и выгодой.
                        </StyledDescription>

                        <Badge>
                            <IconTimerOutline size="m" color="var(--accent)" />
                            <div>Работаем с 10:00 до 22:00</div>
                        </Badge>
                    </DescriptionColumn>

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
                            <Partner src="images/monitorings/exnode.png" />
                        </Link>

                        <Link href="https://bestchange.ru" target="_blank">
                            <Partner src="images/monitorings/bestchange.png" style={{ height: '2rem' }} />
                        </Link>
                    </Row>

                    <Row>
                        <Link href="mailto:helpkykyshka@yandex.com" target="_blank">
                            helpkykyshka@yandex.com
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
