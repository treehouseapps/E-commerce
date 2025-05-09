import { Home, Logout, ContactSupport, FiberManualRecord, Person, Search, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { Typography, Button, Box, Badge, FormControl, Input, InputAdornment, Stack } from "@mui/material";
import { use, useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Cart from "../components/cart";
import { Link } from "react-router-dom";
import { Endpoints } from "../api/endpoints";
import CustomButton from "./Button";


const Navbar = () => {
    const { cart, cartVisibility, openCart } = useContext(CartContext)
    const [user, setUser] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        setUser(token);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <>
            <Box
                padding={2}
                backgroundColor={'white'}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ boxSizing: 'border-box' }}
            >
                <Link to={'/'}> <Typography ml={10} variant="h4" sx={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>
                    <Box display={'inline-flex'} fontFamily={'Quicksand'} fontWeight={'bolder'}>Shopify<Typography color="#f43a09" fontSize={'2rem'} >
                        <b>.</b></Typography></Box></Typography ></Link >
                <Box display="flex" gap={2} alignItems={'center'} >
                    {/* <Link to={Endpoints.productForm}> <Button variant="text" startIcon={<ShoppingBag />}>Prod Form</Button></Link>
                    <Link to={Endpoints.users}> <Button variant="text" startIcon={<ShoppingBag />}>Users</Button></Link>
                    <Link to={Endpoints.AuthAdmin}> <Button variant="text" startIcon={<Search />}>Admin</Button></Link> */}
                    <Stack direction="row" spacing={2} alignItems="center">

                        <FormControl variant="standard" sx={{ m: 1, width: '25ch' }}>
                            <Input
                                placeholder="Search ..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                }
                                sx={{
                                    fontFamily: 'Quicksand',
                                    "&:before": { borderBottom: "1px solid black" },
                                    "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid black" },
                                    "&:after": { borderBottom: "2px solid black" }
                                }}
                            />
                        </FormControl>
                        <Link to={Endpoints.Home}>
                            <Button sx={{
                                color: 'black', fontFamily: 'Quicksand',
                                "&:hover": { transform: "scale(1.1)", transition: '.5s' }
                            }} startIcon={<Home />}><Typography fontFamily={'Quicksand'}>Home</Typography></Button></Link>
                        <Link to={Endpoints.products}>
                            <Button
                                variant="text"
                                sx={{
                                    color: "black",
                                    fontFamily: 'Quicksand',
                                    "&:hover": { transform: "scale(1.1)", transition: '.5s' }
                                }}
                                startIcon={<ShoppingBag />}
                            >
                                <Box display="flex" alignItems="center">
                                    <Typography fontFamily={'Quicksand'}>Products</Typography>
                                    <FiberManualRecord
                                        sx={{
                                            fontSize: '0.5rem',
                                            color: '#f43a09',
                                            position: 'relative',
                                            top: '-10px',
                                            left: '4px'
                                        }}
                                    />
                                </Box>
                            </Button>
                        </Link>

                        <Link to={Endpoints.Contact}>
                            <Button
                                variant="text"
                                sx={{
                                    color: "black",
                                    fontFamily: 'Quicksand',
                                    "&:hover": { transform: "scale(1.1)", transition: '.5s' }
                                }}
                                startIcon={<ContactSupport />}
                            >
                                <Typography fontFamily={'Quicksand'}>Contact Us</Typography>
                            </Button>
                        </Link>

                        <Button
                            variant="text"
                            sx={{
                                color: "black",
                                fontFamily: 'Quicksand',
                                "&:hover": { transform: "scale(1.1)", transition: '.5s' }
                            }}
                            startIcon={
                                <Badge badgeContent={cart?.length || 0} sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#f43a09",
                                        color: "white"
                                    }
                                }}>
                                    <ShoppingCart />
                                </Badge>
                            }
                            onClick={() => { openCart() }}
                        >
                            <Typography fontFamily={'Quicksand'}>Cart</Typography>
                        </Button>
                        {user && (
                            <>
                                <CustomButton onClick={handleLogout} text='Logout' icon={<Logout />} />
                            </>
                        )}
                        <Link to={Endpoints.Auth}>
                            <Button
                                variant="text"
                                sx={{
                                    backgroundColor: '#f43a09',
                                    padding: 0,
                                    color: "white",
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    minWidth: 0,
                                    border: '1px solid #f43a09',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'Quicksand',
                                    "&:hover": { transform: "scale(1.1)", transition: '.5s' }
                                }}
                            >
                                <Person />
                            </Button>
                        </Link>

                    </Stack>

                </Box >
            </Box >
            <Box
                style={{ display: cartVisibility ? 'block' : 'none', }}
                display={cartVisibility}>
                <Cart />
            </Box></>
    );
}

export default Navbar;