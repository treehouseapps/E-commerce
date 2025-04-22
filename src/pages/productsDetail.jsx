import { Box, Typography, Button, Grid, Paper, IconButton, Modal, TextField, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getProductsById } from '../api/products'
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import Navbar from "../components/navbar";

const ProductDetail = () => {
    const { user, addToCart } = useContext(CartContext)
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [openModal, setOpenModal] = useState(false);


    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

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
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const submit = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/products/' + id, {
                method: 'PUT',
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
    }

    const DeleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const result = await fetch('http://localhost:3000/products/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            const data = await result.json()
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

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
                {user == 'admin' && (
                    <>
                        <IconButton
                            sx={{ position: 'absolute', top: '20%', right: 16, color: 'error.main' }}
                            aria-label="delete"
                        >
                            <Delete onClick={() => { DeleteProduct(product._id) }} />
                        </IconButton>
                        <IconButton
                            sx={{ position: 'absolute', top: '30%', right: 16, color: 'primary.main' }}
                            aria-label="edit"
                            onClick={handleOpenModal}
                        >
                            <Edit />
                        </IconButton></>
                )}
            </Paper>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Edit Product
                    </Typography>

                    <TextField label="Name" name='name' value={product.name} onChange={handleChange} fullWidth />
                    <TextField select label="Category" name='category' value={product.category} onChange={handleChange} fullWidth >
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Books">Books</MenuItem>
                        <MenuItem value="Home">Home</MenuItem>
                    </TextField>
                    <TextField label="Description" name='description' value={product.description} onChange={handleChange} fullWidth multiline rows={3} />
                    <TextField label="Price" name='price' value={product.price} onChange={handleChange} fullWidth />

                    <Button variant="contained" color="primary" onClick={() => { submit(product._id) }}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ProductDetail;
