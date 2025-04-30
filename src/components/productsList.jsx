import { Grid, Box, Card, CardContent, CardActions, Typography, Skeleton } from "@mui/material";
import { Link } from 'react-router-dom';
import { getAllProducts } from '../api/products'
import { useEffect, useState, useContext } from "react";
import { CartContext } from '../context/CartContext';
import Button from './Button'
const Products = () => {
    const { addToCart } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [quantities, setQuantities] = useState({});
    const [hoveredItem, setHoveredItem] = useState(null);
    let array = [1, 2, 3, 4, 5, 6, 7, 8]
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

    const handleMouseEnter = (id) => {
        setHoveredItem(id);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
    return (
        <Grid container spacing={3} padding={3} sx={{ width: '100%', margin: '1rem 1rem' }}>
            {products.length > 0 ? (
                products.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item._id}
                        onMouseEnter={() => handleMouseEnter(item._id)}
                        onMouseLeave={handleMouseLeave}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '0px', boxShadow: 3 }}>

                            <Link to={`/products/${item._id}`} style={{ textDecoration: 'none', color: 'black', }}>
                                <CardContent
                                    sx={{ height: '8rem' }} >
                                    <Box
                                        display={'flex'}
                                        justifyContent={'center'}
                                        sx={{ "&:hover": { transform: "scale(1.2)", transition: '.5s' } }}>
                                        <img
                                            src={item.img}
                                            alt=""
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'contain',

                                            }}
                                        />
                                    </Box>
                                </CardContent>
                                <hr />
                            </Link>
                            <Box pl={1}>
                                {hoveredItem === item._id ? (
                                    <CardActions sx={{ width: '95%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantities[item._id] || 1}
                                                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                                style={{
                                                    width: '10%',
                                                    padding: '5px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #ccc',
                                                    marginRight: '10px',
                                                }}
                                            />
                                            <Button onClick={() => addToCart(item, quantities[item._id] || 1)}
                                                sx={{ width: '90%', padding: '2px' }} text='Add to Cart' />

                                        </Box>
                                    </CardActions>
                                ) : (
                                    <Box pl={1} alignContent={'end'}>
                                        <Typography fontFamily={'Trebuchet MS'} fontSize={14} sx={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }}>{item.name}</Typography>
                                        <Typography variant="subtitle1" fontFamily={'Trebuchet MS'} fontSize={13}>Price: ${item.price}</Typography>
                                    </Box>

                                )}
                            </Box>


                        </Card>
                    </Grid>
                ))
            ) : (
                <>
                    {/* <Typography variant="body2" color="textSecondary">Your Product is empty.</Typography> */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {array.map((_, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <Skeleton variant="rectangular" width={300} height={150} />
                                    <Skeleton variant="rectangular" width={220} height={20} style={{ marginTop: 8 }} />
                                    <Skeleton variant="rectangular" width={150} height={20} style={{ marginTop: 8 }} />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )
            }
        </Grid >
    );
}

export default Products;