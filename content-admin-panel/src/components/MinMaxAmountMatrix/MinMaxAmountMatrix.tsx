import React from 'react';
import { Currency, ExchangeDirection, MinMaxAmountPayload } from '../../api/types/common';
import {
    DiagonalCell,
    DraggableTh,
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
    VerticalImg,
} from './MinMaxAmountMatrix.styled';
import { Button } from '../Button/Button.styled';
import { updateDirectionsStatus, updateMinMaxAmount } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { DragIndicator } from '../ExchangeDirectionsMatrix/ExchangeDirectionsMatrix.styled';

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

    const [currencies, setCurrencies] = React.useState(getUniqueCurrencies());
    const [draggedCurrencyId, setDraggedCurrencyId] = React.useState<number | null>(null);
    const [targetCurrencyId, setTargetCurrencyId] = React.useState<number | null>(null);

    const handleDragStart = (currencyId: number) => (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', currencyId.toString());
        setDraggedCurrencyId(currencyId);
    };

    const handleDragOver = (currencyId: number) => (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedCurrencyId !== currencyId) {
            setTargetCurrencyId(currencyId);
        }
    };

    const handleDrop = (currencyId: number) => async (e: React.DragEvent) => {
        e.preventDefault();
        const draggedId = Number(e.dataTransfer.getData('text/plain'));

        if (draggedId && draggedId !== currencyId) {
            const draggedIndex = currencies.findIndex((c) => c.id === draggedId);
            const targetIndex = currencies.findIndex((c) => c.id === currencyId);

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const newCurrencies = [...currencies];
                const [removed] = newCurrencies.splice(draggedIndex, 1);
                newCurrencies.splice(targetIndex, 0, removed);
                setCurrencies(newCurrencies);

                try {
                    await updateDirectionsStatus([], createSortMap(newCurrencies));
                    showNotification('Приоритет валют успешно обновлён', 'success');
                } catch (error) {
                    showNotification('Ошибка обновления приоритета обмена', 'error', error);
                }
            }
        }

        setDraggedCurrencyId(null);
        setTargetCurrencyId(null);
    };

    const handleDragEnd = () => {
        setDraggedCurrencyId(null);
        setTargetCurrencyId(null);
    };

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

    const createSortMap = (currency: Currency[]): Record<string, number> => {
        const sortMap: Record<string, number> = {};

        currency.forEach((currency, index) => {
            sortMap[currency.id.toString()] = index;
        });

        return sortMap;
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
                    createSortMap(currencies),
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
                            <DraggableTh
                                key={`header-${currency.id}`}
                                draggable
                                isDragging={draggedCurrencyId === currency.id}
                                isDropTarget={targetCurrencyId === currency.id}
                                onDragStart={handleDragStart(currency.id)}
                                onDragOver={handleDragOver(currency.id)}
                                onDrop={handleDrop(currency.id)}
                                onDragEnd={handleDragEnd}
                                data-currency-id={currency.id}
                            >
                                <StyledImg src={currency.paymentSystem.imagePath} />
                                <DragIndicator isActive={targetCurrencyId === currency.id} />
                            </DraggableTh>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrixData.map((row, rowIndex) => (
                        <tr key={`row-${currencies[rowIndex].id}`}>
                            <StyledTd>
                                <VerticalImg src={currencies[rowIndex].paymentSystem.imagePath} />
                            </StyledTd>
                            {row.map((cell, colIndex) => {
                                if (rowIndex === colIndex) {
                                    return (
                                        <StyledTd>
                                            <DiagonalCell key={`diag-${rowIndex}-${colIndex}`} />
                                        </StyledTd>
                                    );
                                }

                                if (!cell) {
                                    return (
                                        <StyledTd>
                                            <EmptyCell key={`empty-${rowIndex}-${colIndex}`} />
                                        </StyledTd>
                                    );
                                }

                                const isSelected = selectedDirections.some((d) => d.id === cell.id);
                                const isStartCell = startCell?.row === rowIndex && startCell?.col === colIndex;

                                return (
                                    <StyledTd key={cell.id}>
                                        <ProfitCircle
                                            isSelected={isSelected || isStartCell}
                                            onClick={() => handleCellClick(cell, rowIndex, colIndex)}
                                        >
                                            <div>{cell.minSourceAmount}</div>
                                            <div>{cell.maxSourceAmount}</div>
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
