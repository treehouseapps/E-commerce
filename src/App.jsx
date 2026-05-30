import Routes from "./routes/routes";
import CartProvider from "./context/CartContext";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </UserProvider>
  );
};

export default App;
