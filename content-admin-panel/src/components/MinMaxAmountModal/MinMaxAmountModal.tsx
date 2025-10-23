import { Headline3, Modal, Spinner } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { ExchangeDirection, MinMaxAmountPayload } from '../../api/types/common';
import { MinMaxAmountMatrix } from '../MinMaxAmountMatrix/MinMaxAmountMatrix';
import { getExchangeDirections } from '../../api/handlers';

interface MinMaxAmountModalProps {
    opened: boolean;
    onClose: () => void;
}

const StyledModal = styled(Modal)`
    min-width: 800px;
`;

const Content = styled.div`
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
`;

const SpinnerWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MinMaxAmountModal: React.FC<MinMaxAmountModalProps> = ({ opened, onClose }) => {
    const [directions, setDirections] = React.useState<ExchangeDirection[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleMinMaxAmountUpdate = (payload: MinMaxAmountPayload) => {
        setDirections((prev) =>
            prev.map((d) =>
                payload.ids.includes(d.id)
                    ? { ...d, minSourceAmount: payload.minSourceAmount, maxSourceAmount: payload.maxSourceAmount }
                    : d,
            ),
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
            <Headline3>Границы обмена</Headline3>

            {Boolean(isLoading) && (
                <SpinnerWrapper>
                    <Spinner size={32} color="grey" />
                </SpinnerWrapper>
            )}

            {Boolean(!isLoading) && (
                <Content>
                    <MinMaxAmountMatrix directions={directions} onMinMaxAmountUpdate={handleMinMaxAmountUpdate} />
                </Content>
            )}
        </StyledModal>
    );
};
