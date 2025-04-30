import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import { Lock, Person, Email, Message } from '@mui/icons-material';
import Navbar from '../components/navbar';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    // const url = 'https://e-commerce-api-f9qb.onrender.com/'
    const url = 'https://th-ecommerce-api.vercel.app/'

    useEffect(() => {
        const fun = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(url + 'getMessages/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                setMessages(data.messages || [])
            } catch (error) {
                console.error(error)
            }
        }
        fun()
    }, [])

    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Messages List</Typography>
                <Grid container spacing={3}>
                    {messages.length > 0 ? (messages.map((user, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography><Lock /> ID: {user._id}</Typography>
                                    <Typography variant="h6"><Person /> Name: {user.name}</Typography>
                                    <Typography><Email /> Email: {user.email}</Typography>
                                    <Typography><Message /> Message: {user.message}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                    ) : (<Typography variant="body2" color="textSecondary">Your User Messages is empty.</Typography>)
                    }
                </Grid>
            </Container>
        </>
    );
};

export default MessageList;