import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    Badge,
    ButtonCopy,
    ClipPreview,
    Preview,
    Requisites,
    Row,
    StyledAmount,
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
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconChevronLeft, IconClip, IconCopyFill } from '@salutejs/plasma-icons';
import { $payout } from '../../stores/payout.store';
import { setPayoutStatus, uploadPayoutAttachment } from '../../api/handlers';
import { Spinner } from '@salutejs/plasma-web';
import { formatNumber } from '../../utils/formatNumber';
import { getPayoutStatus } from '../../utils/getPayoutStatus';

export const PayoutPayment: React.FC = () => {
    const payout = useStore($payout);

    const [preview, setPreview] = React.useState('');
    const [error, setError] = React.useState('');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(ROUTES.userDetails());
    };

    const handleForward = () => {
        navigate(ROUTES.payoutStatus(payout?.id));

        if (payout?.id && payout.status !== 'COMPLETED' && payout?.status !== 'ERROR') {
            setPayoutStatus(payout.id);
        }
    };

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

    React.useEffect(() => {
        const handlePopState = () => {
            navigate(ROUTES.root);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return (
        <StyledLayout>
            <StyledContent>
                <Row>
                    <StyledButtonBack view="clear" onClick={handleBack}>
                        <IconChevronLeft size="s" color="white" />
                    </StyledButtonBack>

                    <Breadcrumbs
                        path={[
                            { number: 1, name: 'Ввод реквизитов', isActive: false },
                            { number: 2, name: 'Оплата заявки', isActive: true },
                            { number: 3, name: 'Завершение', isActive: false },
                        ]}
                    />
                </Row>

                <StyledText>{getPayoutStatus(payout)}</StyledText>

                <StyledHeader>Оплатите заявку</StyledHeader>

                <Requisites>
                    <div>Реквизиты для оплаты:</div>

                    {payout?.exchangeRequisites ? (
                        <Badge>
                            <div>{payout?.exchangeRequisites.replace(/.{4}\B/g, '$& ')}</div>
                            <ButtonCopy
                                view="clear"
                                onClick={() => {
                                    navigator.clipboard.writeText(payout?.exchangeRequisites);
                                }}
                            >
                                <IconCopyFill color="white" />
                            </ButtonCopy>
                        </Badge>
                    ) : (
                        <>
                            <StyledSpinner>
                                <Spinner size="3rem" color="white" />
                            </StyledSpinner>
                            <StyledDescription>Реквизиты появятся здесь в течение 10 минут</StyledDescription>
                        </>
                    )}
                </Requisites>

                <StyledAmount>
                    <div>Сумма</div>
                    <div>
                        {formatNumber(payout?.amountFrom)} {payout?.srcCurrency.currencyCode.code || ''}
                    </div>
                </StyledAmount>

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

                <StyledDescription>
                    Время на оплату заявки до 10 минут. Мы не принимаем платежи от юридических лиц. Заявки оплаченные от
                    юр. лиц не будут исполнены. Переводы со счета сим карт и других платежных систем так же не будут
                    засчитаны в пользу оплаты. Средства поступят в течение 24 часов.
                </StyledDescription>

                <StyledButton onClick={handleForward}>Я оплатил(-а)</StyledButton>
            </StyledContent>
        </StyledLayout>
    );
};
