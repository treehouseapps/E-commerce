import { Routes, Route } from 'react-router-dom';
import ProductDetail from '../pages/productsDetail';
import AuthPage from '../pages/AuthPage';
import AuthPageAdmin from '../pages/AuthPageAdmin';
import Products from '../pages/products';
import Users from '../pages/UserList';
import ProductForm from '../pages/ProductForm';
import { Endpoints } from '../api/endpoints';

function App() {
    return (
        <Routes>
            <Route path={Endpoints.Auth} element={<AuthPage />} />
            <Route path={Endpoints.AuthAdmin} element={<AuthPageAdmin />} />
            <Route path={Endpoints.products} element={<Products />} />
            <Route path={Endpoints.users} element={<Users />} />
            <Route path={Endpoints.productForm} element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
    );
}

export default App;
