import { useState } from 'react';
import { useMatrix } from '@/app/providers/MatrixProvider.tsx';
import './MatrixForm.css';

const MatrixForm: React.FC = () => {
    const [rows, setRows] = useState(5);
    const [columns, setColumns] = useState(5);
    const [highlightCount, setHighlightCount] = useState(5);
    const { regenerateMatrix } = useMatrix();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        regenerateMatrix(rows, columns, highlightCount);  // Передаємо X у функцію перегенерації
    };


    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div>
                <label>Rows (M): </label>
                <input
                    type="number"
                    value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    min="1"
                    max="100"
                    className="border p-1"
                />
            </div>
            <div>
                <label>Columns (N): </label>
                <input
                    type="number"
                    value={columns}
                    onChange={(e) => setColumns(Number(e.target.value))}
                    min="1"
                    max="100"
                    className="border p-1"
                />
            </div>
            <div>
                <label>Highlight Count (X): </label>
                <input
                    type="number"
                    value={highlightCount}
                    onChange={(e) => setHighlightCount(Number(e.target.value))}
                    min="1"
                    max={rows * columns}
                    className="border p-1"
                />
            </div>
            <button type="submit" className="mt-2 bg-blue-500 text-white p-1">
                Generate Table
            </button>
        </form>
    );
};

export default MatrixForm;