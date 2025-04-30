import React from 'react';
import { Box, Typography, TextField, Grid, Paper } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Button from '../components/Button'

const Contact = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <Paper elevation={3} sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
                    <Typography variant="h4" fontFamily="Quicksand" fontWeight={700} gutterBottom>
                        Contact Us
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Get in touch
                            </Typography>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Email sx={{ mr: 1, color: '#f43a09' }} />
                                <Typography>Email: bbekijunior@gmail.com</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Phone sx={{ mr: 1, color: '#f43a09' }} />
                                <Typography>Phone: +123 456 7890</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <LocationOn sx={{ mr: 1, color: '#f43a09' }} />
                                <Typography>Addis Abeba, Ethiopia</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Send us a message
                            </Typography>
                            <Box component="form" display="grid" gap={2}>
                                <TextField label="Your Name" fullWidth required />
                                <TextField label="Your Email" type="email" fullWidth required />
                                <TextField
                                    label="Message"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    required
                                />
                                <Button text='Send' onClick={() => { alert('Sent !!!') }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Footer />
        </>
    );
};

export default Contact;