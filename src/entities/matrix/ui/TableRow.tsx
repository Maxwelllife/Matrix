import TableCell from '@/entities/matrix/ui/TableCell';
import { useMatrix } from "@/app/providers/MatrixProvider.tsx";
import {useState, useCallback, useMemo} from "react";

type TableRowProps = {
    row: { id: number; amount: number }[],
    rowIndex: number,
    sum: number,
    key?: number,
    onRemove: () => void,
};

const TableRow: React.FC<TableRowProps> = ({ row, rowIndex, sum, onRemove }) => {
    const { updateCell, highlightClosestCells } = useMatrix();
    const [showPercentages, setShowPercentages] = useState(false);

// Обчислюємо локальні значення лише один раз
    const localDisplayValues = useMemo(() => {
        if (showPercentages) {
            return row.map(cell => `${((cell.amount / sum) * 100).toFixed(1)}%`);
        }
        return row.map(cell => cell.amount);
    }, [showPercentages, row, sum]);
    // Обробник наведення на комірку суми
    const handleMouseEnterSum = useCallback(() => {
        setShowPercentages(true);
    }, []);

    const handleMouseLeaveSum = useCallback(() => {
        setShowPercentages(false);
    }, []);

    // Меморизовані обробники для комірок
    const handleMouseEnterCell = useCallback(
        (cellAmount: number) => {
            highlightClosestCells(cellAmount);
        },
        [highlightClosestCells]
    );

    const handleMouseLeaveCell = useCallback(
        () => {
            highlightClosestCells(-1);
        },
        [highlightClosestCells]
    );


    const handleCellClick = (cellId: number, amount: number) => {
        updateCell(rowIndex, cellId, amount + 1);
    };

    return (
        <tr>
            {row.map((cell, i) => (
                <TableCell
                    key={cell.id}
                    cell={cell}
                    displayValue={localDisplayValues[i]}
                    onCellClick={() => handleCellClick(cell.id, cell.amount)}
                    onMouseEnter={() => handleMouseEnterCell(cell.amount)}
                    onMouseLeave={handleMouseLeaveCell}
                />
            ))}
            <td onMouseEnter={handleMouseEnterSum} onMouseLeave={handleMouseLeaveSum}>
                {sum}
            </td>
            <td>
                <button onClick={onRemove}>Remove</button>
            </td>
        </tr>
    );
};

export default TableRow;
