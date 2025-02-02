import { useContext } from 'react';
import { MatrixContext } from '@/app/providers/MatrixProvider';

export const useHighlightedCells = () => {
    const context = useContext(MatrixContext);
    if (!context) {
        throw new Error('useHighlightedCells must be used within a MatrixProvider');
    }
    return context.highlightedCells;
};
