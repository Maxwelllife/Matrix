import {useMatrix} from '@/app/providers/MatrixProvider';

type TableCellProps = {
    cell: { id: number; amount: number },
    rowIndex: number,
    key?: number
};

const TableCell: React.FC<TableCellProps> = ({ cell, rowIndex,}) => {
    const {updateCell} = useMatrix();

    const handleClick = () => {
        updateCell(rowIndex, cell.id, cell.amount + 1);
    };

    return (
        <td
            onClick={handleClick}
            className="border border-gray-300 p-2 text-center cursor-pointer hover:bg-gray-200"
        >
            {cell.amount}
        </td>
    );
};
export default TableCell;