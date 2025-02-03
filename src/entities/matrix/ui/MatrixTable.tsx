import { useMatrix } from '@/app/providers/MatrixProvider';
import TableRow from '@/entities/matrix/ui/TableRow';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from './MatrixTable.module.css';

const MatrixTable: React.FC = () => {
    const { matrix, rowSums, columnPercentiles, removeRow } = useMatrix();
    const parentRef = useRef<HTMLDivElement>(null);

    // Virtualization setup
    const rowVirtualizer = useVirtualizer({
        count: matrix.length,
        overscan: 5,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,  // Assuming a row height of 40px; adjust if necessary
    });

    return (
        <div className={styles.matrixContainer}>
            <div ref={parentRef} className={styles.matrixScrollContainer}>
                <table className={styles.matrixTable}>
                    <thead>
                    <tr>
                        {matrix[0].map((_, colIndex) => (
                            <th key={colIndex}>Col {colIndex + 1}</th>
                        ))}
                        <th>Sum</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const rowIndex = virtualRow.index;
                        return (
                            <TableRow
                                key={rowIndex}
                                row={matrix[rowIndex]}
                                rowIndex={rowIndex}
                                sum={rowSums[rowIndex]}
                                onRemove={() => removeRow(rowIndex)}
                            />
                        );
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        {columnPercentiles.map((percentile, colIndex) => (
                            <td key={colIndex}>{percentile.toFixed(1)}</td>
                        ))}
                        <td colSpan={2}>50% Percentiles</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default MatrixTable;
