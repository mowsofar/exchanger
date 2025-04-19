import { Headline3, Modal, Spinner } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { ExchangeDirection, StatusUpdatePayload } from '../../api/types/common';
import { getExchangeDirections } from '../../api/handlers';
import { StatusSettingsMatrix } from '../StatusSettingsMatrix/StatusSettingsMatrix';

const StyledModal = styled(Modal)`
    min-width: 800px;
`;

const Content = styled.div`
    width: 100%;
    padding-top: 20px;
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

interface UpdateStatusModalProps {
    opened: boolean;
    onClose: () => void;
}

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({ opened, onClose }) => {
    const [directions, setDirections] = React.useState<ExchangeDirection[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleStatusUpdate = (payload: StatusUpdatePayload) => {
        setDirections((prev) =>
            prev.map((d) => (payload.ids.includes(d.id) ? { ...d, status: payload.newStatus } : d)),
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
            <Headline3>Настройка статуса</Headline3>

            {Boolean(isLoading) && (
                <SpinnerWrapper>
                    <Spinner size={32} color="grey" />
                </SpinnerWrapper>
            )}

            {Boolean(!isLoading) && (
                <Content>
                    <StatusSettingsMatrix directions={directions} onStatusUpdate={handleStatusUpdate} />
                </Content>
            )}
        </StyledModal>
    );
};
