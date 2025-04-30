import React, { useState } from 'react';
import { Box, Typography, TextField, Grid, Paper } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Button from '../components/Button'

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const url = 'https://th-ecommerce-api.vercel.app/'

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(url + 'message', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            const result = await response.json()
            alert(result.message)
            setName('')
            setEmail('')
            setMessage('')
        } catch (error) {
            console.log(error)
        }
    }
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
                                <TextField label="Your Name" fullWidth required
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }} />
                                <TextField label="Your Email" type="email" fullWidth required
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }} />
                                <TextField
                                    label="Message"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    required
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                />
                                <Button text='Send' onClick={() => { handleSubmit() }} />
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