import { MatrixProvider } from '@/app/providers/MatrixProvider.tsx';
import MatrixPage from "@/pages/MatrixPage.tsx";

const App = () => (
    <MatrixProvider>
        <MatrixPage />
    </MatrixProvider>
);

export default App;

