import { Routes, Route } from 'react-router-dom';
import Products from '../pages/products';
import ProductDetail from '../pages/productsDetail';
import Home from '../pages/home';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
    );
}

export default App;
