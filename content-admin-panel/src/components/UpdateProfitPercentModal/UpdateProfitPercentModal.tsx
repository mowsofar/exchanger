import { Headline3, Modal, Spinner } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { ExchangeDirection, ProfitUpdatePayload } from '../../api/types/common';
import { ExchangeDirectionsMatrix } from '../ExchangeDirectionsMatrix/ExchangeDirectionsMatrix';
import { getExchangeDirections } from '../../api/handlers';

interface UpdateProfitPercentModalProps {
    opened: boolean;
    onClose: () => void;
}

const StyledModal = styled(Modal)`
    min-width: 800px;
`;

const Content = styled.div`
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    > div > div {
        font-weight: 550;
    }
`;

const SpinnerWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const UpdateProfitPercentModal: React.FC<UpdateProfitPercentModalProps> = ({ opened, onClose }) => {
    const [directions, setDirections] = React.useState<ExchangeDirection[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleProfitUpdate = (payload: ProfitUpdatePayload) => {
        setDirections((prev) =>
            prev.map((d) => (payload.ids.includes(d.id) ? { ...d, profitPercent: payload.newProfit } : d)),
        );
    };

    const openModal = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const directionsArray = await getExchangeDirections();
            setDirections(directionsArray);
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        if (opened) {
            openModal();
        }
    }, [openModal, opened]);

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Проценты обмена</Headline3>

            {Boolean(isLoading) && (
                <SpinnerWrapper>
                    <Spinner size={32} />
                </SpinnerWrapper>
            )}

            {Boolean(!isLoading) && (
                <Content>
                    <ExchangeDirectionsMatrix directions={directions} onProfitUpdate={handleProfitUpdate} />
                </Content>
            )}
        </StyledModal>
    );
};
