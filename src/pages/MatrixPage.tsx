import MatrixForm from '@/features/generate-matrix/ui/MatrixForm';
import MatrixTable from '@/entities/matrix/ui/MatrixTable';

const MatrixPage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Matrix Generator</h1>
            <MatrixForm />
            <MatrixTable />
        </div>
    );
};

export default MatrixPage;
