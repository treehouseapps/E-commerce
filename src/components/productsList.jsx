import { Grid, Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/products'
import { useEffect, useState, useContext } from "react";
import { CartContext } from '../context/CartContext';

const Products = () => {
    const { addToCart } = useContext(CartContext)
    const [products, setProducts] = useState([])

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


    return (
        <Grid container spacing={3} padding={3} sx={{ width: '100%' }}>
            {products.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2, boxShadow: 3 }}>
                        <Link to={'/products/' + item._id} style={{ textDecoration: 'none', color: 'black' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="bold">Price: ${item.price}</Typography>
                                <Typography variant="caption" color="textSecondary">Category: {item.category}</Typography>
                            </CardContent></Link>
                        <CardActions>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => addToCart(item)}
                            >
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Products;