import { Headline3, Modal, TextField } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { Select } from '../Select/Select';
import { $exchangeDirections } from '../../stores/exchangeDirections.store';
import { formatCalculatorInput, formatToSubmit } from '../../utils/formatNumber';
import { Autobroker } from '../../api/types/common';

interface AddAutobrokerModalProps {
    opened: boolean;
    onClose: () => void;
    selectedAutobroker: Autobroker;
    editAutobroker: (id: number, newData: any) => void;
}

const AutobrokerStatuses = [
    { value: 'ACTIVE', label: 'Включён' },
    { value: 'INACTIVE', label: 'Отключён' },
];

const StyledModal = styled(Modal)`
    width: 480px;
`;

const Content = styled.div`
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
`;

export const EditAutobrokerModal: React.FC<AddAutobrokerModalProps> = ({
    opened,
    onClose,
    editAutobroker,
    selectedAutobroker,
}) => {
    const [selectedExchangeDirection, setSelectedExchangeDirection] = React.useState<string>(
        String(selectedAutobroker.exchangeDirectionId),
    );
    const [minCourse, setMinCourse] = React.useState<string>(formatCalculatorInput(selectedAutobroker.minCourse));
    const [position, setPosition] = React.useState<number>(selectedAutobroker.position);
    const [status, setStatus] = React.useState(selectedAutobroker.status);

    const exchangeDirections = useStore($exchangeDirections);

    const exchangeDirectionsOptions = exchangeDirections.map((item) => {
        return {
            value: String(item.id),
            label: `${item.sourceCurrency.paymentSystem.name} ${item.sourceCurrency.currencyCode.code} → ${item.targetCurrency.paymentSystem.name} ${item.targetCurrency.currencyCode.code}`,
        };
    });

    const handleChangeMinCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinCourse(formatCalculatorInput(e.target.value));
    };

    const onCloseModal = () => {
        onClose();
    };

    const handleSubmit = () => {
        const newData: any = {};

        if (minCourse !== formatCalculatorInput(selectedAutobroker.minCourse)) {
            newData.minCourse = formatToSubmit(minCourse);
        }

        if (selectedExchangeDirection && selectedExchangeDirection !== String(selectedAutobroker.exchangeDirectionId)) {
            newData.exchangeDirectionId = selectedExchangeDirection;
        }

        if (position !== selectedAutobroker.position) {
            newData.position = position;
        }

        if (status !== selectedAutobroker.status) {
            newData.status = status;
        }

        editAutobroker(selectedAutobroker.id, newData);
        onCloseModal();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Редактировать автоброкер</Headline3>

            <Content>
                <Select
                    label="Направление"
                    items={exchangeDirectionsOptions}
                    value={selectedExchangeDirection}
                    onChange={(value) => setSelectedExchangeDirection(value as string)}
                    size="l"
                />

                <StyledTextField label="Минимальный курс" value={minCourse} onChange={handleChangeMinCourse} />

                <StyledTextField
                    label="Приоритет"
                    value={position}
                    type="number"
                    onChange={(e) => setPosition(Number(e.target.value))}
                />

                <Select
                    label="Статус"
                    items={AutobrokerStatuses}
                    value={status}
                    onChange={(value) => setStatus(value as string)}
                    size="l"
                />

                <Button text="Изменить" stretch onClick={handleSubmit} />
            </Content>
        </StyledModal>
    );
};
