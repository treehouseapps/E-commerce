import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    MenuItem,
    Box,
    InputAdornment,
} from '@mui/material';
import {
    Inventory2,
    Description,
    AttachMoney,
    Category,
    Save,
} from '@mui/icons-material';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: 'item',
        description: 'Description for item 1',
        price: 100,
        category: 'Electronics',
    });

    // const url = 'https://e-commerce-api-f9qb.onrender.com/'
    const url = 'https://th-ecommerce-api.vercel.app/'

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(url + 'products/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            const result = await response.json()
            alert(result.message)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 4,
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: '#f9f9f9',
                    }}
                >
                    <Typography variant="h5" gutterBottom align="center">
                        Add New Product
                    </Typography>

                    <TextField
                        label="Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Inventory2 />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        fullWidth
                        required
                        multiline
                        rows={3}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Description />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoney />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        select
                        label="Category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Category />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Books">Books</MenuItem>
                        <MenuItem value="Home">Home</MenuItem>
                    </TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<Save />}
                        sx={{ mt: 3 }}
                    >
                        Save Product
                    </Button>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ProductForm;