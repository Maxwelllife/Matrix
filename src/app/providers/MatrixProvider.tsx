import { createContext, useContext, useState } from 'react';

// Типи даних
interface Cell {
    id: number;
    amount: number;
}

interface MatrixContextType {
    matrix: Cell[][];
    rowSums: number[];
    columnPercentiles: number[];
    updateCell: (rowIndex: number, cellId: number, newValue: number) => void;
    regenerateMatrix: (rows: number, columns: number, highlightCount: number) => void;
    showPercentages: (rowIndex: number | null) => void;
    highlightedCells: any;
}

export const MatrixContext = createContext<MatrixContextType | null>(null);

const generateRandomMatrix = (rows: number, columns: number): Cell[][] => {
    let idCounter = 0;
    return Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({ id: idCounter++, amount: Math.floor(Math.random() * 900) + 100 }))
    );
};

const calculateColumnPercentiles = (matrix: Cell[][]): number[] => {
    const columns = matrix[0].length;
    const percentiles: number[] = [];

    for (let col = 0; col < columns; col++) {
        const values = matrix.map((row) => row[col].amount).sort((a, b) => a - b);
        const percentileIndex = Math.floor(values.length * 0.5);
        percentiles.push(values[percentileIndex]);
    }

    return percentiles;
};

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [matrix, setMatrix] = useState<Cell[][]>(generateRandomMatrix(5, 5));
    const [highlightCount, setHighlightCount] = useState<number>(6);
    const [highlightedCells, setHighlightedCells] = useState<Set<number>>(new Set());  // Додаємо стейт для підсвічених комірок
    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);  // Стан наведення на суму

    const rowSums = matrix.map((row) => row.reduce((sum, cell) => sum + cell.amount, 0));
    const columnPercentiles = calculateColumnPercentiles(matrix);

    const regenerateMatrix = (rows: number, columns: number, newHighlightCount: number) => {
        const totalCells = rows * columns;
        const validatedX = Math.min(newHighlightCount, totalCells);  // Перевірка X
        setHighlightCount(validatedX);
        setMatrix(generateRandomMatrix(rows, columns));
        setHighlightedCells(new Set());  // Очищуємо підсвічені комірки при генерації
    };
    const addRow = () => {
        setMatrix((prev) => {
            const newRow = Array.from({ length: prev[0].length }, (_, i) => ({
                id: Math.max(...prev.flat().map(cell => cell.id)) + 1 + i,
                amount: Math.floor(Math.random() * 900) + 100,
            }));
            return [...prev, newRow];
        });
    };

    const removeRow = (rowIndex: number) => {
        setMatrix((prev) => prev.filter((_, i) => i !== rowIndex));
    };

    const highlightClosestCells = (targetValue: number) => {
        if (targetValue === -1) {
            setHighlightedCells(new Set());  // Очищаємо підсвічення
            return;
        }
        // Перетворюємо матрицю на одномірний масив для пошуку
        const allCells = matrix.flat();

        // Сортуємо за різницею значень між коміркою і значенням targetValue
        const sortedCells = allCells
            .map(cell => ({
                ...cell,
                difference: Math.abs(cell.amount - targetValue),
            }))
            .sort((a, b) => a.difference - b.difference);

        // Вибираємо `X` найближчих комірок
        const closestCellIds = new Set(sortedCells.slice(0, highlightCount+1).map(cell => cell.id));
        setHighlightedCells(closestCellIds);
    };
    const showPercentages = (rowIndex: number | null) => {
        setHoveredRowIndex(rowIndex);  // Зберігаємо індекс рядка з відсотками
    };
    const updateCell = (rowIndex: number, cellId: number, newValue: number) => {
        setMatrix((prev) =>
            prev.map((row, i) =>
                i === rowIndex
                    ? row.map((cell) => (cell.id === cellId ? { ...cell, amount: newValue } : cell))
                    : row
            )
        );
    };

    return (
        <MatrixContext.Provider
            value={{
                matrix,
                highlightCount,
                highlightedCells,
                rowSums,
                columnPercentiles,
                updateCell,
                regenerateMatrix,
                highlightClosestCells,
                showPercentages,
                addRow,
                removeRow
            }}
        >
            {children}
        </MatrixContext.Provider>
    );
};

export const useMatrix = () => {
    const context = useContext(MatrixContext);
    if (!context) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }
    return context;
};
