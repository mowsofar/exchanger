import { Headline3, Modal } from '@salutejs/plasma-web';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import { useStore } from '@nanostores/react';
import { TextFieldGrey } from '../TextField/TextField';
import { Select } from '../Select/Select';
import { $exchangeDirections } from '../../stores/exchangeDirections.store';
import { formatCalculatorInput } from '../../utils/formatNumber';

interface AddAutobrokerModalProps {
    opened: boolean;
    onClose: () => void;
    createAutobroker: (minCourse: number, exchangeDirectionId: number, position: number) => void;
}

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

const StyledTextField = styled(TextFieldGrey)`
    width: 100%;
`;

export const AddAutobrokerModal: React.FC<AddAutobrokerModalProps> = ({ opened, onClose, createAutobroker }) => {
    const [selectedExchangeDirection, setSelectedExchangeDirection] = React.useState<number>();
    const [minCourse, setMinCourse] = React.useState<string>();
    const [position, setPosition] = React.useState<number>();

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
        setSelectedExchangeDirection(undefined);
        setMinCourse(undefined);
        setPosition(undefined);
        onClose();
    };

    const handleSubmit = () => {
        if (selectedExchangeDirection && minCourse !== undefined && position !== undefined) {
            createAutobroker(Number(minCourse), selectedExchangeDirection, position);
        }
        onCloseModal();
    };

    return (
        <StyledModal opened={opened} onClose={onClose}>
            <Headline3>Добавить автоброкер</Headline3>

            <Content>
                <Select
                    label="Направление"
                    items={exchangeDirectionsOptions}
                    value={selectedExchangeDirection}
                    onChange={(value) => setSelectedExchangeDirection(value as number)}
                    size="l"
                />

                <StyledTextField label="Минимальный курс" value={minCourse} onChange={handleChangeMinCourse} />

                <StyledTextField
                    label="Приоритет"
                    value={position}
                    type="number"
                    onChange={(e) => setPosition(Number(e.target.value))}
                />

                <Button
                    text="Добавить"
                    stretch
                    onClick={handleSubmit}
                    disabled={!selectedExchangeDirection || minCourse === undefined || position === undefined}
                />
            </Content>
        </StyledModal>
    );
};
