import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/navbar';
import Button from '../components/Button';

const PageWithBlurredBackground = () => {
    return (
        <>
            <Box sx={{ position: 'relative', height: '100vh' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url("./cover.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(2px)',
                        zIndex: -1,
                    }}
                />
                <Navbar />
                <Box
                    height={'3rem'}
                    display={'flex'}
                    gap={10}
                    pl={3}
                    alignItems={'center'}
                    sx={{ backgroundColor: '#faf3dd' }}
                >
                    <Typography sx={{ letterSpacing: '2px', fontFamily: 'Quicksand' }}>Shop All</Typography>
                    <Typography sx={{ letterSpacing: '2px', fontFamily: 'Quicksand' }}>Computers</Typography>
                    <Typography sx={{ letterSpacing: '2px', fontFamily: 'Quicksand' }}>Clothes</Typography>
                    <Typography sx={{ letterSpacing: '2px', fontFamily: 'Quicksand' }}>Watches</Typography>
                    <Typography sx={{ letterSpacing: '2px', fontFamily: 'Quicksand' }}>Cars</Typography>
                    <Typography sx={{ letterSpacing: '2px', fontFamily: 'Quicksand' }}>Mobile Phones</Typography>
                </Box>
                <Box
                    mt={13} ml={20} width={'50%'}>
                    <Typography p={'1px 15px'} width={'max-content'} sx={{ backgroundColor: '#f43a09', color: 'white' }}>Best Prices</Typography>
                    <Typography variant='h2' mt={2} fontFamily={'Trebuchet MS'}>Incredible Prices on All Your Favorite Items</Typography>
                    <Typography width={'max-content'} p={1} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>Get more for less on selected brands</Typography>
                    <Button text='Shop Now' sx={{
                        borderRadius: '20px',
                        marginTop: '20px', padding: '0.5rem 1rem',
                        width: '10rem', "&:hover": { transform: "scale(1.1)" }
                    }} />
                </Box>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <Box sx={{ height: '25rem', backgroundColor: 'black' }}>
                    <Typography fontFamily={'quicksand'} color='white' variant='h4' width={400}
                        ml={10} mt={10}>Need Help? Check Out Our Help Center</Typography>
                    <Typography fontFamily={'quicksand'} color='white' fontSize={18} width={400}
                        ml={10} mt={5}

                    >I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.</Typography>
                    <Button text='Contact Center' sx={{
                        margin: '1rem 5rem',
                        "&:hover": { transform: "scale(1.1)" }
                    }} />
                </Box>
                <Box sx={{ placeItems: 'center', height: '25rem', backgroundColor: '#faf3dd' }}>
                    <Typography variant='h3' mt={5} fontFamily={'Quicksand'}>About Us</Typography>
                    <Typography fontSize={'20px'} mt={2} fontFamily={'Quicksand'} width={'80%'}>
                        I'm a paragraph. Click here to add your own text and edit me.
                        It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.
                        I’m a great place for you to tell a story and let your users know a little more about you.</Typography>
                </Box>
            </Box>
        </>
    );
};

export default PageWithBlurredBackground;
