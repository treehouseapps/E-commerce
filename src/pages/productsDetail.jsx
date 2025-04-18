import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { getProductsById } from '../api/products'
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import Navbar from "../components/navbar";

const ProductDetail = () => {
    const { addToCart } = useContext(CartContext)
    const { id } = useParams();
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductsById(id)
                setProduct(data.product)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProduct()
    }, [])

    return (
        <>
            <  Navbar />
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            alt={product.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 2,
                                maxHeight: 400,
                                objectFit: 'cover'
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {product.name}
                        </Typography>

                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            Category: {product.category}
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            {product.description}
                        </Typography>

                        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                            ${product.price}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            </Paper></>
    );
};

export default ProductDetail;
