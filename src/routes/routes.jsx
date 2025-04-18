import { Routes, Route } from 'react-router-dom';
import Products from '../pages/products';
import ProductDetail from '../pages/productsDetail';
import AuthPage from '../pages/AuthPage';
import { Endpoints } from '../api/endpoints';

function App() {
    return (
        <Routes>
            <Route path={Endpoints.Auth} element={<AuthPage />} />
            <Route path={Endpoints.products} element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
    );
}

export default App;
