import React from 'react';
import { Currency, ExchangeDirection, ProfitUpdatePayload } from '../../api/types/common';
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
    VerticalImg,
} from './ExchangeDirectionsMatrix.styled';
import { updateProfitPercent } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../Button/Button.styled';

interface ExchangeDirectionsMatrixProps {
    directions: ExchangeDirection[];
    onProfitUpdate: (payload: ProfitUpdatePayload) => void;
}

export const ExchangeDirectionsMatrix: React.FC<ExchangeDirectionsMatrixProps> = ({ directions, onProfitUpdate }) => {
    const [selectedDirections, setSelectedDirections] = React.useState<ExchangeDirection[]>([]);
    const [editProfit, setEditProfit] = React.useState('');
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

    const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditProfit(e.target.value);
    };

    const handleSave = async () => {
        const newProfit = parseFloat(editProfit);
        if (!isNaN(newProfit) && selectedDirections.length > 0) {
            onProfitUpdate({
                ids: selectedDirections.map((d) => d.id),
                newProfit,
            });
            try {
                await updateProfitPercent(
                    selectedDirections.map((d) => d.id),
                    newProfit,
                );
                showNotification('Процент обмена успешно обновлен', 'success');
            } catch (error) {
                showNotification('Ошибка обновления процента обмена', 'error', error);
            }
            setEditProfit('');
            setSelectedDirections([]);
        }
    };

    const handleCancel = () => {
        setSelectedDirections([]);
        setEditProfit('');
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
                        placeholder="Новый процент"
                        type="number"
                        value={editProfit}
                        onChange={handleProfitChange}
                        step="0.01"
                    />
                    <Button size="xs" onClick={handleSave} disabled={!editProfit || selectedDirections.length === 0}>
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
                                            {cell.profitPercent}%
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
