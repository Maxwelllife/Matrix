import TableCell from '@/entities/matrix/ui/TableCell';
import {useMatrix} from "@/app/providers/MatrixProvider.tsx";
import {useEffect, useState} from "react";

type TableRowProps = {
    row: { id: number; amount: number }[],
    rowIndex: number,
    sum: number,
    key?: number
};

const TableRow: React.FC<TableRowProps> = ({ row, rowIndex, sum }) => {
    const { hoveredRowIndex, showPercentages } = useMatrix();
    const [localDisplayValues, setLocalDisplayValues] = useState<(string | number)[]>(row.map(cell => cell.amount));

    useEffect(() => {
        if (hoveredRowIndex === rowIndex) {
            console.log('Відображаємо відсотки для рядка:', rowIndex);
        }
    }, [hoveredRowIndex, rowIndex]);

    const handleMouseEnter = () => {
        const percentages = row.map((cell) => `${((cell.amount / sum) * 100).toFixed(1)}%`);
        setLocalDisplayValues(percentages);
        showPercentages(rowIndex);  // Показуємо відсотки для цього рядка
        // console.log('rowIndex', rowIndex);
        // console.log('hoveredRowIndex', hoveredRowIndex);
    };
    const handleMouseLeave = () => {
        setLocalDisplayValues(row.map(cell => cell.amount));
        showPercentages(null);  // Прибираємо відсотки
    };
    return (
        <tr>
            {row.map((cell, i) => (
                <TableCell
                    key={cell.id}
                    cell={cell}
                    rowIndex={rowIndex}
                    displayValue={localDisplayValues[i]}
                />
            ))}
            <td onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {sum}
            </td>
        </tr>
    );
};
export default TableRow;