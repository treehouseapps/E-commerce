import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentDate = new Date().getFullYear()
    return (
        <>
            <Box sx={{ backgroundColor: '#eaeaea' }} mt={5}>
                <Box
                    p={5}
                    display="flex"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    maxWidth="1200px"
                    margin="0 auto"
                    sx={{
                        backgroundColor: '#eaeaea',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        textAlign: { xs: 'center', sm: 'left' },
                    }}
                >
                    <Box mb={3} display={'grid'} justifyContent={'center'} sx={{ flex: 1, minWidth: '220px' }}>
                        <Typography fontSize={17} fontFamily="Quicksand" fontWeight={700}>
                            Menu
                        </Typography>
                        <Box m={1} mt={2} display="grid" gap={1}>
                            <Link
                                to="/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Products
                            </Link>
                            <Link
                                to="https://bekijunior.vercel.app/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="https://bekijunior.vercel.app/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                About Us
                            </Link>
                        </Box>
                    </Box>

                    <Box mb={3} display={'grid'} justifyContent={'center'} sx={{ flex: 1, minWidth: '220px' }}>
                        <Typography fontSize={17} fontFamily="Quicksand" fontWeight={700}>
                            Categories
                        </Typography>
                        <Box m={1} mt={2} display="grid" gap={1}>
                            <Link
                                to="/products"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Men's Clothes
                            </Link>
                            <Link
                                to="/products"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Woman's Clothes
                            </Link>
                            <Link
                                to="/products"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Electronics
                            </Link>
                            <Link
                                to="/products"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Accessories                            </Link>
                        </Box>
                    </Box>

                    <Box mb={3} display={'grid'} justifyContent={'center'} sx={{ flex: 1, minWidth: '220px' }}>
                        <Typography fontSize={17} fontFamily="Quicksand" fontWeight={700}>
                            Resources
                        </Typography>
                        <Box m={1} mt={2} display="grid" gap={1}>
                            <Link
                                to="https://bekijunior.vercel.app/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Customer Support
                            </Link>
                            <Link
                                to="https://bekijunior.vercel.app/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                FAQ
                            </Link>
                            <Link
                                to="https://bekijunior.vercel.app/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Live Chat
                            </Link>
                            <Link
                                to="https://bekijunior.vercel.app/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Returns
                            </Link>
                        </Box>
                    </Box>

                    <Box mb={3} display={'grid'} justifyContent={'center'} sx={{ flex: 1, minWidth: '220px' }}>
                        <Typography fontSize={17} fontFamily="Quicksand" fontWeight={700}>
                            Social Media
                        </Typography>
                        <Box m={1} mt={2} display="grid" gap={1}>
                            <Link
                                to="https://www.linkedin.com/in/berekettsegaye/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Linkedin
                            </Link>
                            <Link
                                to="https://t.me/b_smile"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Telegram
                            </Link>
                            <Link
                                to="https://github.com/treehouseapps"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Github
                            </Link>
                            <Link
                                to="https://bekijunior.vercel.app/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontSize: '15px',
                                    fontFamily: 'Quicksand',
                                    fontWeight: '600',
                                }}
                            >
                                Gmail
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <hr />
                <Box
                    p={5}
                    display="flex"
                    justifyContent="center"
                    flexWrap="wrap"
                    maxWidth="1200px"
                    margin="0 auto"
                    sx={{
                        backgroundColor: '#eaeaea',
                    }} >
                    <Typography color="#333" fontFamily={'Quicksand'}
                        fontWeight={'700'} letterSpacing={1}
                        sx={{ wordSpacing: '2px' }}>
                        Copyright © {currentDate} Shopify | Powered by
                        <Link to='https://github.com/treehouseapps'>TreehouseApps</Link>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default Footer;
