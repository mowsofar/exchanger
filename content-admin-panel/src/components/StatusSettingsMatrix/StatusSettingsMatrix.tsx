import React from 'react';
import {
    Currency,
    ExchangeDirection,
    ExchangeDirectionsStatusValues,
    StatusType,
    StatusUpdatePayload,
} from '../../api/types/common';
import {
    DiagonalCell,
    DraggableTh,
    DragIndicator,
    EditControls,
    EditPanel,
    EmptyCell,
    MatrixContainer,
    Circle,
    SelectionInfo,
    StyledImg,
    StyledSelect,
    StyledTable,
    StyledTd,
    StyledTh,
    VerticalImg,
} from './StatusSettingsMatrix.styled';
import { updateDirectionsStatus, updateStatus } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';
import { Button } from '../Button/Button.styled';
import { IconClose, IconDocumentOutline, IconDone } from '@salutejs/plasma-icons';

interface StatusSettingsMatrixProps {
    directions: ExchangeDirection[];
    onStatusUpdate: (payload: StatusUpdatePayload) => void;
}

export const StatusSettingsMatrix: React.FC<StatusSettingsMatrixProps> = ({ directions, onStatusUpdate }) => {
    const [selectedDirections, setSelectedDirections] = React.useState<ExchangeDirection[]>([]);
    const [newStatus, setNewStatus] = React.useState<'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | ''>('');
    const [startCell, setStartCell] = React.useState<{ row: number; col: number } | null>(null);

    const showNotification = useNotification();

    const createSortMap = (currency: Currency[]): Record<string, number> => {
        const sortMap: Record<string, number> = {};

        currency.forEach((currency, index) => {
            sortMap[currency.id.toString()] = index;
        });

        return sortMap;
    };

    const getUniqueCurrencies = (): Currency[] => {
        const currencies = new Map<number, Currency>();

        directions.forEach((direction) => {
            currencies.set(direction.sourceCurrency.id, direction.sourceCurrency);
            currencies.set(direction.targetCurrency.id, direction.targetCurrency);
        });

        return Array.from(currencies.values()).sort((a, b) => a.sort - b.sort);
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

    const matrixData = currencies.map((source) => {
        return currencies.map((target) => {
            if (source.id === target.id) return null;
            return (
                directions.find((d) => d.sourceCurrency.id === source.id && d.targetCurrency.id === target.id) || null
            );
        });
    });

    const handleSave = async () => {
        if (newStatus && selectedDirections.length > 0) {
            onStatusUpdate({
                ids: selectedDirections.map((d) => d.id),
                newStatus,
            });
            try {
                await updateStatus(
                    selectedDirections.map((d) => d.id),
                    newStatus,
                    createSortMap(currencies),
                );
                showNotification('Статус успешно обновлён', 'success');
            } catch (error) {
                showNotification('Ошибка обновления статуса', 'error', error);
            }
            setNewStatus('');
            setSelectedDirections([]);
        }
    };

    const handleCancel = () => {
        setSelectedDirections([]);
        setNewStatus('');
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
                    <StyledSelect
                        label="Новый статус"
                        placeholder="Выберите статус"
                        items={ExchangeDirectionsStatusValues}
                        onChange={(value) => setNewStatus(value as StatusType)}
                    />
                    <Button size="xs" onClick={handleSave} disabled={!newStatus || selectedDirections.length === 0}>
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
                                        <Circle
                                            status={cell?.status}
                                            isSelected={isSelected || isStartCell}
                                            onClick={() => handleCellClick(cell, rowIndex, colIndex)}
                                        >
                                            {cell.status === 'ACTIVE' && <IconDone color="white" />}
                                            {cell.status === 'INACTIVE' && <IconClose color="white" />}
                                            {cell.status === 'ARCHIVED' && <IconDocumentOutline color="white" />}
                                        </Circle>
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
