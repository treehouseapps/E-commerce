import { Grid, Box, Card, CardContent, CardActions, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/products'
import { useEffect, useState, useContext } from "react";
import { CartContext } from '../context/CartContext';
import Button from './Button'
const Products = () => {
    const { addToCart } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [quantities, setQuantities] = useState({});
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleQuantityChange = (id, value) => {
        setQuantities(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <Grid container spacing={3} padding={3} sx={{ width: '100%' }}>
            {products.length > 0 ? (
                products.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2, boxShadow: 3 }}>
                            <Link to={`/products/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary" mb={1}>
                                        {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">Price: ${item.price}</Typography>
                                    <Typography variant="caption" color="textSecondary">Category: {item.category}</Typography>
                                </CardContent>
                            </Link>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[item._id] || 1}
                                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                        style={{
                                            width: '30%',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #ccc',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <Button onClick={() => addToCart(item, quantities[item._id] || 1)}
                                        sx={{ width: '70%' }} text='Add to Cart' />

                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary">Your Product is empty.</Typography>
            )}
        </Grid>

    );
}

export default Products;