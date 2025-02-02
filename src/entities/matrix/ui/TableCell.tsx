import {memo} from 'react';
import styles from './MatrixTable.module.css'
import {useHighlightedCells} from "@/shared/hooks/useHighlightedCells.ts";


type TableCellProps = {
    cell: { id: number; amount: number },
    key?: number,
    displayValue: number | string,
    onCellClick?: () => void,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void
};

const TableCell: React.FC<TableCellProps> = memo(({
                                                      cell,
                                                      displayValue,
                                                      onCellClick,
                                                      onMouseEnter,
                                                      onMouseLeave,
                                                  }) => {
        // const {updateCell, highlightedCells, highlightClosestCells} = useMatrix();
        const highlightedCells = useHighlightedCells();
        console.log('Rendering cell', cell.id);

        return (
            <td
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onCellClick}
                className={`${
                    highlightedCells.has(cell.id) ? styles.highlight : ''
                }`}
            >
                {displayValue !== cell.amount ? displayValue : cell.amount}
            </td>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.cell.amount === nextProps.cell.amount &&
            prevProps.displayValue === nextProps.displayValue
        );
    }
);

export default TableCell;