import Routes from './routes/routes'
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <CartProvider>
            <Routes />
        </CartProvider>
    );
}

export default App;