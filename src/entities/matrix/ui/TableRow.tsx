import TableCell from '@/entities/matrix/ui/TableCell';

type TableRowProps = {
    row: { id: number; amount: number }[],
    rowIndex: number,
    sum: number,
    key?: number
};

const TableRow: React.FC<TableRowProps> = ({ row, rowIndex, sum }) => {
    return (
        <tr>
            {row.map((cell) => (
                <TableCell key={cell.id} cell={cell} rowIndex={rowIndex}/>
            ))}
            <td className="border border-gray-300 p-2 font-bold">{sum}</td>
        </tr>
    );
};
export default TableRow;