import { useMatrix } from '@/app/providers/MatrixProvider';
import TableRow from '@/entities/matrix/ui/TableRow';
import './MatrixTable.module.css';

const MatrixTable: React.FC = () => {
    const { matrix, rowSums, columnPercentiles, addRow, removeRow } = useMatrix();

    return (
        <table className="">
            <thead>
            <tr>
                {matrix[0].map((_, colIndex) => (
                    <th key={colIndex}>Col {colIndex + 1}</th>
                ))}
                <th>Sum</th>
            </tr>
            </thead>
            <tbody>
            {matrix.map((row, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    sum={rowSums[rowIndex]}
                    onRemove={() => removeRow(rowIndex)}
                />
            ))}
            <tr>
                {columnPercentiles.map((percentile, colIndex) => (
                    <td key={colIndex}>{percentile.toFixed(1)}</td>
                ))}
                <td>50% Percentiles</td>
            </tr>
            </tbody>
        </table>
    );
};
export default MatrixTable;
