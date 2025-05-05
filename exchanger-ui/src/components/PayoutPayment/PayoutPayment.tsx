import React, { useCallback } from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    Badge,
    ButtonCopy,
    ClipPreview,
    Preview,
    RequisiesButton,
    Requisites,
    Row,
    SpinnerWrapper,
    StyledAmount,
    StyledBlackDescription,
    StyledButton,
    StyledButtonBack,
    StyledContent,
    StyledDescription,
    StyledHeader,
    StyledLayout,
    StyledSpinner,
    StyledText,
    StyledUpload,
    UploadBlock,
    UploadRow,
} from './PayoutPayment.styled';
import { useStore } from '@nanostores/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconChevronLeft, IconClip, IconCopyFill } from '@salutejs/plasma-icons';
import { $payout } from '../../stores/payout.store';
import { getRequisites, setPayoutStatus, uploadPayoutAttachment } from '../../api/handlers';
import { Spinner } from '@salutejs/plasma-web';
import { formatNumber } from '../../utils/formatNumber';

export const PayoutPayment: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const payout = useStore($payout);

    const [preview, setPreview] = React.useState('');
    const [error, setError] = React.useState('');
    const [isCopied, setIsCopied] = React.useState(false);

    const hasImage = React.useMemo(
        () => Boolean(payout?.attachments?.[0]?.fileName) || Boolean(preview),
        [payout?.attachments, preview],
    );

    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        navigate(ROUTES.userDetails());
    };

    const handleForward = useCallback(() => {
        navigate(ROUTES.payoutStatus(payout?.id), { state: { from: ROUTES.payment(payout?.id) } });
    }, [navigate, payout?.id]);

    const handleSubmit = useCallback(async () => {
        try {
            if (payout?.id) {
                const newPayout = await setPayoutStatus(payout?.id);
                $payout.set(newPayout);
            }

            handleForward();
        } catch {}
    }, [handleForward, payout?.id]);

    const handleUploadFile = async (file: File) => {
        try {
            setError('');
            const formData = new FormData();
            formData.append('files', file);
            setPreview(file.name);

            if (payout?.id) {
                await uploadPayoutAttachment(payout?.id, formData);
            }
        } catch (error) {
            setError('Ошибка загрузки файла');
        }
    };

    const getPayoutRequisistes = useCallback(async () => {
        try {
            if (payout?.id) {
                const newPayout = await getRequisites(payout?.id);
                $payout.set(newPayout);
            }
        } catch {}
    }, [payout?.id]);

    React.useEffect(() => {
        if (payout?.status && !(payout?.status === 'CREATED' || payout?.status === 'WAITING_FOR_REQUISITES')) {
            handleForward();
        }
    }, [handleForward, navigate, payout?.status]);

    React.useEffect(() => {
        const handlePopState = () => {
            const fromPage = location?.state?.from;

            if (fromPage === ROUTES.userDetails(payout?.srcCurrency?.id, payout?.targetCurrency?.id)) {
                navigate(ROUTES.root);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [location?.state?.from, navigate, payout?.id, payout?.srcCurrency.id, payout?.targetCurrency.id]);

    if (Boolean(isLoading)) {
        return (
            <StyledLayout>
                <StyledContent>
                    <Row>
                        <StyledButtonBack view="clear" onClick={handleBack}>
                            <IconChevronLeft size="s" color="var(--accentText)" />
                        </StyledButtonBack>

                        <Breadcrumbs
                            path={[
                                { number: 1, name: 'Ввод реквизитов', isActive: false },
                                { number: 2, name: 'Оплата заявки', isActive: true },
                                { number: 3, name: 'Завершение', isActive: false },
                            ]}
                        />
                    </Row>

                    <SpinnerWrapper>
                        <Spinner size="5rem" color="var(--accent)" />
                    </SpinnerWrapper>
                </StyledContent>
            </StyledLayout>
        );
    }

    return (
        <StyledLayout>
            <StyledContent>
                <Row>
                    <StyledButtonBack view="clear" onClick={handleBack}>
                        <IconChevronLeft size="s" color="var(--accentText)" />
                    </StyledButtonBack>

                    <Breadcrumbs
                        path={[
                            { number: 1, name: 'Ввод реквизитов', isActive: false },
                            { number: 2, name: 'Оплата заявки', isActive: true },
                            { number: 3, name: 'Завершение', isActive: false },
                        ]}
                    />
                </Row>

                <StyledText>Заявка №{payout?.id} успешно создана!</StyledText>

                <StyledHeader>Оплатите заявку</StyledHeader>

                <Requisites>
                    <div>Реквизиты для оплаты:</div>

                    {payout?.status === 'CREATED' && (
                        <RequisiesButton onClick={getPayoutRequisistes}>Получить реквизиты</RequisiesButton>
                    )}

                    {payout?.status !== 'CREATED' && payout?.exchangeRequisites && (
                        <Badge>
                            <div style={{ color: isCopied ? 'var(--accent)' : 'var(--accentText)' }}>
                                {payout.exchangeRequisites}
                            </div>
                            <ButtonCopy
                                view="clear"
                                onClick={() => {
                                    navigator.clipboard.writeText(payout?.exchangeRequisites);
                                    setIsCopied(true);
                                }}
                            >
                                <IconCopyFill color={isCopied ? 'var(--accent)' : 'var(--accentText)'} />
                            </ButtonCopy>
                        </Badge>
                    )}

                    {payout?.status !== 'CREATED' && !payout?.exchangeRequisites && (
                        <Badge>
                            <StyledSpinner>
                                <Spinner size="2rem" color="white" />
                            </StyledSpinner>
                            <StyledBlackDescription>
                                Реквизиты появятся здесь в течение 5-10 минут
                            </StyledBlackDescription>
                        </Badge>
                    )}
                </Requisites>

                <StyledAmount>
                    <div>Сумма</div>
                    <div>
                        {formatNumber(payout?.amountFrom)} {payout?.srcCurrency.currencyCode.code || ''}
                    </div>
                </StyledAmount>
                {payout?.srcCurrency.filterType !== 'COIN' && (
                    <UploadBlock>
                        <div>Загрузите чек об оплате в формате pdf:</div>
                        <UploadRow>
                            <StyledUpload content="Выберите pdf-файл" accept=".pdf" onChange={handleUploadFile} />
                            {error ? (
                                <Preview style={{ color: 'red' }}>{error}</Preview>
                            ) : (
                                (preview || payout?.attachments?.[0]?.fileName) && (
                                    <ClipPreview>
                                        <IconClip size="m" color="#26c499" />
                                        <Preview>{preview || payout?.attachments?.[0]?.fileName}</Preview>
                                    </ClipPreview>
                                )
                            )}
                        </UploadRow>
                    </UploadBlock>
                )}

                <StyledDescription>
                    Время на оплату заявки до 10 минут. Мы не принимаем платежи от юридических лиц. Заявки оплаченные от
                    юр. лиц не будут исполнены. Переводы со счета сим карт и других платежных систем так же не будут
                    засчитаны в пользу оплаты. Средства поступят в течение 24 часов.
                </StyledDescription>

                <StyledButton
                    onClick={handleSubmit}
                    disabled={
                        payout?.status === 'CREATED' ||
                        (payout?.srcCurrency.filterType === 'COIN'
                            ? payout?.status !== 'WAITING_FOR_REQUISITES'
                            : !hasImage || Boolean(error)) ||
                        !payout?.exchangeRequisites
                    }
                >
                    Я оплатил(-а)
                </StyledButton>
            </StyledContent>
        </StyledLayout>
    );
};
