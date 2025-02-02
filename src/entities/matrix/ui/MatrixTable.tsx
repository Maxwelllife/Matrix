import { useMatrix } from '@/app/providers/MatrixProvider';
import TableRow from '@/entities/matrix/ui/TableRow';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import './MatrixTable.module.css';

const MatrixTable: React.FC = () => {
    const { matrix, rowSums, columnPercentiles, removeRow } = useMatrix();
    const parentRef = useRef<HTMLDivElement>(null);

    // Virtualization setup
    const rowVirtualizer = useVirtualizer({
        count: matrix.length,
        overscan: 5,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,  // Adjust this value if needed
    });

    console.log('Virtualized rows:', rowVirtualizer.getVirtualItems());

    return (
        <div className="matrix-container">
            <table className="matrix-table">
                <thead>
                <tr>
                    {matrix[0].map((_, colIndex) => (
                        <th key={colIndex}>Col {colIndex + 1}</th>
                    ))}
                    <th>Sum</th>
                    <th>Actions</th>
                </tr>
                </thead>
            </table>

            <div ref={parentRef} className="matrix-scroll-container" style={{ height: '300px', overflow: 'auto' }}>
                <table className="matrix-table">
                    <tbody>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const rowIndex = virtualRow.index;
                        console.log(`Rendering row: ${rowIndex}`);
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
                </table>
            </div>

            <table className="matrix-table">
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
    );
};

export default MatrixTable;
