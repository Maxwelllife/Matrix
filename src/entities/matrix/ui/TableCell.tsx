import {memo} from 'react';
import {useMatrix} from '@/app/providers/MatrixProvider';
import styles from './MatrixTable.module.css'


type TableCellProps = {
    cell: { id: number; amount: number },
    rowIndex: number,
    key?: number,
    displayValue: number | string;  // Показуємо або значення, або відсоток
};

const TableCell: React.FC<TableCellProps> = memo(({cell, rowIndex, displayValue}) => {
        const {updateCell, highlightedCells, highlightClosestCells} = useMatrix();
        console.log('Rendering cell', cell.id)
        const handleMouseEnter = () => {
            highlightClosestCells(cell.amount);  // Підсвічуємо комірки при наведенні
        };
        const handleMouseLeave = () => {
            // Очищаємо підсвічування, коли курсор залишає комірку
            highlightClosestCells(-1);  // Передаємо неіснуюче значення, щоб очистити стан
        };
        const handleClick = () => {
            updateCell(rowIndex, cell.id, cell.amount + 1);
        };

        return (
            <td
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
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
            prevProps.displayValue === nextProps.displayValue &&
            prevProps.rowIndex === nextProps.rowIndex
        );
    }
);

export default TableCell;