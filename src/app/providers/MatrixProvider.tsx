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
}

const MatrixContext = createContext<MatrixContextType | null>(null);

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
    const [highlightCount, setHighlightCount] = useState<number>(5);

    const rowSums = matrix.map((row) => row.reduce((sum, cell) => sum + cell.amount, 0));
    const columnPercentiles = calculateColumnPercentiles(matrix);

    const regenerateMatrix = (rows: number, columns: number, newHighlightCount: number) => {
        const totalCells = rows * columns;
        const validatedX = Math.min(newHighlightCount, totalCells);  // Перевірка X
        setHighlightCount(validatedX);
        setMatrix(generateRandomMatrix(rows, columns));
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
        <MatrixContext.Provider value={{ matrix, highlightCount, rowSums, columnPercentiles, updateCell, regenerateMatrix }}>
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
