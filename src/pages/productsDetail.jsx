import { Box, CardActions, Typography, Grid, IconButton, Modal, TextField, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getProductsById } from '../api/products'
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import Navbar from "../components/navbar";
import Button from '../components/Button'
import Footer from "../components/footer";

const ProductDetail = () => {
    const { user, addToCart } = useContext(CartContext)
    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [value, setValue] = useState(1)
    const [text, setText] = useState(true)
    // const url = 'https://e-commerce-api-f9qb.onrender.com/'
    const url = 'https://th-ecommerce-api.vercel.app/'

    const addValue = (newValue) => {
        setValue(newValue)
    }
    const minValue = (newValue) => {
        if (value > 1) { setValue(newValue) }
    }
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const handleQuantityChange = (id, value) => {
        setQuantities(prev => ({
            ...prev,
            [id]: value
        }));
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
            const response = await fetch(url + 'products/' + id, {
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
            const result = await fetch(url + 'products/' + id, {
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
            <Grid display={'grid'} gridTemplateColumns={'1fr 1fr'}>
                <Box boxShadow={'1px 1px 8px 1px lightgray'} m={4} mt={2} p={5} sx={{ display: 'grid', placeItems: 'center' }}>
                    <img src={product.img} style={{
                        width: '300px',
                        objectFit: 'contain',
                        borderRadius: 2,
                        boxShadow: 2,
                    }} />
                </Box>
                <Box m={4} mt={2} p={5}>
                    <Box>
                        <Typography fontFamily={'Quicksand'} fontWeight={700}
                            variant="subtitle1" color="textSecondary"
                            gutterBottom
                            sx={{ display: 'inline-flex', gap: '.2rem', }}
                        >
                            <Link to="/" style={{ textDecoration: 'none', color: 'gray' }}>Home </Link> /
                            <Link to='/products' style={{ textDecoration: 'none', color: 'gray' }}>Categories</Link> /
                            <Link style={{ textDecoration: 'none', color: 'gray' }}> {product.category}</Link >
                        </Typography>
                        <Typography fontFamily={'Quicksand'} variant="h6" width={'70%'} mt={2} fontWeight="bold" gutterBottom>
                            {product.name}
                        </Typography>

                        <Typography fontFamily={'Quicksand'} fontWeight={700} color="gray" variant="body1" sx={{ marginBottom: 2 }}>
                            {product.description} Are you really reading this text
                            this is a Demo Website just check the functionality and if it works just Go shoo shoo!!
                        </Typography>

                        <Typography fontFamily={'Times'} variant="h5" color="gray" fontWeight="bold" gutterBottom>
                            $ {product.price}
                        </Typography>

                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Box sx={{ width: '30%' }}
                                    display="flex" alignItems="center" mt={1} gap={1}>
                                    <IconButton
                                        onClick={() => minValue(value - 1)}
                                        size="small" sx={{ border: '2px solid black', borderRadius: '0' }}
                                    >
                                        −
                                    </IconButton>
                                    <Box px={2} py={0.5} borderRadius={1} border="2px solid black" color="black">
                                        {value}
                                    </Box>
                                    <IconButton
                                        onClick={() => addValue(value + 1)}
                                        size="small" sx={{ border: '2px solid black', borderRadius: '0' }}
                                    >
                                        +
                                    </IconButton>
                                </Box>
                                <Button text='Add to Cart' sx={{ width: '80%' }} onClick={() => addToCart(product, value || 1)} />
                            </Box>
                        </CardActions>
                        <Box mt={2}>
                            <fieldset>
                                <legend> <Typography padding={'0 1rem'} color="gray" fontFamily={'Quicksand'} fontWeight={500}>Guaranteed Safe Checkout</Typography> </legend>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} p={1}>
                                    <img src="/telebirr.jpg" style={{ width: '5rem', maxHeight: '3rem' }} />
                                    <img src="/visa.svg" style={{ width: '5rem', maxHeight: '3rem' }} />
                                    <img src="/mastercard.svg" style={{ width: '5rem', maxHeight: '3rem' }} />
                                    <img src="/america.svg" style={{ width: '5rem', maxHeight: '3rem' }} />
                                </Box>
                            </fieldset>
                        </Box>
                    </Box>
                    {user.role == 'admin' && (
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

                </Box >
            </Grid >
            <Box m={'1rem 5rem'} borderTop={'1px solid gray'} p={'0rem 2rem'}>
                <Box display={'flex'} gap={2} m={'.5rem 0'}>
                    <Typography fontFamily={'Quicksand'} fontWeight={700} sx={{ cursor: 'pointer' }} color="#333"
                        onClick={() => { setText(true) }}>Descreption</Typography>
                    <Typography fontFamily={'Quicksand'} fontWeight={700} sx={{ cursor: 'pointer' }} color="#333"
                        onClick={() => { setText(false) }}>Review</Typography>

                </Box>
                <Box mb={7}>
                    {text ? (
                        <Typography fontFamily={'Quicksand'} fontWeight={500} color="gray">{product.description} Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,
                            purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque
                            habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem.</Typography>
                    ) : (
                        <Box border={'1px solid gray'} mt={5} p={'1rem 3rem'}>
                            <Typography variant="h6" color="gray" fontFamily={'Quicksand'} fontWeight={700}>
                                Be the first to review "{product.name}"</Typography>
                            <Box display={'grid'}>
                                <Box m={'1rem 0rem'}>
                                    <Typography fontFamily={'Quicksand'} fontWeight={500} color="gray">Your Review *</Typography>
                                    <textarea style={{ textIndent: '1rem', padding: '.5rem', width: '100%', fontSize: '17px', minHeight: '5rem', borderColor: 'gray' }} />
                                </Box>
                                <Box display={'inline-flex'} gap={5}>
                                    <Box><Typography fontFamily={'Quicksand'} fontWeight={500} color="gray" >Name *</Typography>
                                        <TextField /></Box>
                                    <Box><Typography fontFamily={'Quicksand'} fontWeight={500} color="gray">Email *</Typography>
                                        <TextField /></Box>
                                </Box>
                                <Button text='Submit' sx={{ marginTop: '1rem', width: '15%' }} />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
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
            <Footer />
        </>
    );
};

export default ProductDetail;
