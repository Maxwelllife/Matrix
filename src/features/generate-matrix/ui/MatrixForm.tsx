import { useState } from 'react';
import { useMatrix } from '@/app/providers/MatrixProvider.tsx';
import styles from'./MatrixForm.module.css';

const MatrixForm: React.FC = () => {
    const [rows, setRows] = useState(5);
    const [columns, setColumns] = useState(5);
    const [highlightCount, setHighlightCount] = useState(5);
    const { regenerateMatrix, addRow } = useMatrix();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        regenerateMatrix(rows, columns, highlightCount);  // Передаємо X у функцію перегенерації
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
               <div className={styles.input_list}>
                   <div className={styles.input_item}>
                       <label>Rows (M): </label>
                       <input
                           type="number"
                           value={rows}
                           onChange={(e) => setRows(Number(e.target.value))}
                           min="1"
                           max="100"
                       />
                   </div>
                   <div className={styles.input_item}>
                       <label>Columns (N): </label>
                       <input
                           type="number"
                           value={columns}
                           onChange={(e) => setColumns(Number(e.target.value))}
                           min="1"
                           max="100"
                       />
                   </div>
                   <div className={styles.input_item}>
                       <label>Highlight Count (X): </label>
                       <input
                           type="number"
                           value={highlightCount}
                           onChange={(e) => setHighlightCount(Number(e.target.value))}
                           min="1"
                           max={rows * columns}
                       />
                   </div>
               </div>
                <button type="submit">
                    Generate Table
                </button>

            </form>
            <button onClick={addRow}>Add Row</button>
        </>
    );
};

export default MatrixForm;