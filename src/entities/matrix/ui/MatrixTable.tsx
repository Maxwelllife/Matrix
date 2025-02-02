import { useMatrix } from '@/app/providers/MatrixProvider';
import TableRow from '@/entities/matrix/ui/TableRow';
import './MatrixTable.css';

const MatrixTable: React.FC = () => {
    const { matrix, rowSums, columnPercentiles } = useMatrix();

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
            <tr>
                {matrix[0].map((_, colIndex) => (
                    <th key={colIndex} className="border border-gray-300 p-2">Col {colIndex + 1}</th>
                ))}
                <th className="border border-gray-300 p-2">Sum</th>
            </tr>
            </thead>
            <tbody>
            {matrix.map((row, rowIndex) => (
                <TableRow key={rowIndex} row={row} rowIndex={rowIndex} sum={rowSums[rowIndex]} />
            ))}
            <tr>
                {columnPercentiles.map((percentile, colIndex) => (
                    <td key={colIndex} className="border border-gray-300 p-2">{percentile.toFixed(1)}</td>
                ))}
                <td className="border border-gray-300 p-2 font-bold">50% Percentiles</td>
            </tr>
            </tbody>
        </table>
    );
};
export default MatrixTable;
