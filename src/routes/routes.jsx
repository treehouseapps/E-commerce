import { Routes, Route } from 'react-router-dom';
import ProductDetail from '../pages/productsDetail';
import AuthPage from '../pages/AuthPage';
import AuthPageAdmin from '../pages/AuthPageAdmin';
import Products from '../pages/products';
import Users from '../pages/UserList';
import ProductForm from '../pages/ProductForm';
import { Endpoints } from '../api/endpoints';
import Home from '../pages/Home';
import Contact from '../pages/Contact';

function App() {
    return (
        <Routes>
            <Route path={Endpoints.Home} element={<Home />} />
            <Route path={Endpoints.Auth} element={<AuthPage />} />
            <Route path={Endpoints.AuthAdmin} element={<AuthPageAdmin />} />
            <Route path={Endpoints.products} element={<Products />} />
            <Route path={Endpoints.Contact} element={<Contact />} />
            <Route path={Endpoints.users} element={<Users />} />
            <Route path={Endpoints.productForm} element={<ProductForm />} />
            <Route path={Endpoints.productId} element={<ProductDetail />} />
        </Routes>
    );
}

export default App;
