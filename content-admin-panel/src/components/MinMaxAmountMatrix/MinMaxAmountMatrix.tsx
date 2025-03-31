import React from 'react';
import { Currency, ExchangeDirection, MinMaxAmountPayload } from '../../api/types/common';
import {
    DiagonalCell,
    EditControls,
    EditPanel,
    EmptyCell,
    MatrixContainer,
    ProfitCircle,
    SelectionInfo,
    StyledImg,
    StyledTable,
    StyledTd,
    StyledTextField,
    StyledTh,
} from './MinMaxAmountMatrix.styled';
import { Button } from '../Button/Button.styled';
import { updateMinMaxAmount } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { IconDone, IconPlus } from '@salutejs/plasma-icons';

interface MinMaxAmountMatrixProps {
    directions: ExchangeDirection[];
    onMinMaxAmountUpdate: (payload: MinMaxAmountPayload) => void;
}

export const MinMaxAmountMatrix: React.FC<MinMaxAmountMatrixProps> = ({ directions, onMinMaxAmountUpdate }) => {
    const [selectedDirections, setSelectedDirections] = React.useState<ExchangeDirection[]>([]);
    const [minSourceAmount, setMinSourceAmount] = React.useState('');
    const [maxSourceAmount, setMaxSourceAmount] = React.useState('');
    const [startCell, setStartCell] = React.useState<{ row: number; col: number } | null>(null);

    const showNotification = useNotification();

    const getUniqueCurrencies = (): Currency[] => {
        const currencies = new Map<number, Currency>();

        directions.forEach((direction) => {
            currencies.set(direction.sourceCurrency.id, direction.sourceCurrency);
            currencies.set(direction.targetCurrency.id, direction.targetCurrency);
        });
        return Array.from(currencies.values());
    };

    const currencies = getUniqueCurrencies();

    const handleCellClick = (direction: ExchangeDirection, rowIndex: number, colIndex: number) => {
        if (rowIndex === colIndex) return; // Игнорируем диагональ

        if (!startCell) {
            // Первый клик - запоминаем позицию
            setStartCell({ row: rowIndex, col: colIndex });
            setSelectedDirections([direction]);
        } else {
            // Второй клик - выделяем только ячейки на пути
            const selected: ExchangeDirection[] = [];
            const rowStart = Math.min(startCell.row, rowIndex);
            const rowEnd = Math.max(startCell.row, rowIndex);
            const colStart = Math.min(startCell.col, colIndex);
            const colEnd = Math.max(startCell.col, colIndex);

            // Выделяем только ячейки в прямоугольнике между точками
            for (let r = rowStart; r <= rowEnd; r++) {
                for (let c = colStart; c <= colEnd; c++) {
                    if (r === c) continue; // Пропускаем диагональ

                    const dir = directions.find(
                        (d) => d.sourceCurrency.id === currencies[r].id && d.targetCurrency.id === currencies[c].id,
                    );

                    if (dir) selected.push(dir);
                }
            }

            setSelectedDirections(selected);
            setStartCell(null);
        }
    };

    const matrixData = currencies.map((source) => {
        return currencies.map((target) => {
            if (source.id === target.id) return null;
            return (
                directions.find((d) => d.sourceCurrency.id === source.id && d.targetCurrency.id === target.id) || null
            );
        });
    });

    const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinSourceAmount(e.target.value);
    };

    const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxSourceAmount(e.target.value);
    };

    const handleSave = async () => {
        const minSource = parseFloat(minSourceAmount);
        const maxSource = parseFloat(maxSourceAmount);

        if (!isNaN(minSource) && !isNaN(maxSource) && selectedDirections.length > 0) {
            onMinMaxAmountUpdate({
                ids: selectedDirections.map((d) => d.id),
                minSourceAmount: minSource,
                maxSourceAmount: maxSource,
            });
            try {
                await updateMinMaxAmount(
                    selectedDirections.map((d) => d.id),
                    minSource,
                    maxSource,
                );
                showNotification('Процент обмена успешно обновлен', 'success');
            } catch (error) {
                showNotification('Ошибка обновления процента обмена', 'error', error);
            }
            setSelectedDirections([]);
            setMinSourceAmount('');
            setMaxSourceAmount('');
        }
    };

    const handleCancel = () => {
        setSelectedDirections([]);
        setMinSourceAmount('');
        setMaxSourceAmount('');
    };

    const handleSelectAll = () => {
        setSelectedDirections([...directions]);
    };

    return (
        <MatrixContainer>
            <EditPanel>
                <SelectionInfo>
                    <strong>Выбрано: {selectedDirections.length}</strong>
                </SelectionInfo>
                <EditControls>
                    <StyledTextField
                        placeholder="Минимальная сумма обмена"
                        type="number"
                        value={minSourceAmount}
                        onChange={handleMinAmountChange}
                        step="0.01"
                    />

                    <StyledTextField
                        placeholder="Максимальная сумма обмена"
                        type="number"
                        value={maxSourceAmount}
                        onChange={handleMaxAmountChange}
                        step="0.01"
                    />
                </EditControls>

                <EditControls>
                    <Button
                        onClick={handleSave}
                        disabled={!minSourceAmount || !maxSourceAmount || selectedDirections.length === 0}
                    >
                        Применить ко всем
                    </Button>
                    <Button view="secondary" onClick={handleCancel}>
                        Сбросить
                    </Button>
                    <Button view="secondary" onClick={handleSelectAll}>
                        Выбрать все
                    </Button>
                </EditControls>
            </EditPanel>

            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh></StyledTh>
                        {currencies.map((currency) => (
                            <StyledTh key={`header-${currency.id}`}>
                                <StyledImg src={currency.paymentSystem.imagePath} />
                            </StyledTh>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrixData.map((row, rowIndex) => (
                        <tr key={`row-${currencies[rowIndex].id}`}>
                            <StyledTd>
                                <StyledImg src={currencies[rowIndex].paymentSystem.imagePath} />
                            </StyledTd>
                            {row.map((cell, colIndex) => {
                                if (rowIndex === colIndex) {
                                    return <DiagonalCell key={`diag-${rowIndex}-${colIndex}`} />;
                                }

                                if (!cell) {
                                    return <EmptyCell key={`empty-${rowIndex}-${colIndex}`} />;
                                }

                                const isSelected = selectedDirections.some((d) => d.id === cell.id);
                                const isStartCell = startCell?.row === rowIndex && startCell?.col === colIndex;

                                return (
                                    <StyledTd key={cell.id}>
                                        <ProfitCircle
                                            isSelected={isSelected || isStartCell}
                                            onClick={() => handleCellClick(cell, rowIndex, colIndex)}
                                        >
                                            {Boolean(isSelected) ? <IconDone /> : <IconPlus color="white" size="xs" />}
                                        </ProfitCircle>
                                    </StyledTd>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </MatrixContainer>
    );
};
