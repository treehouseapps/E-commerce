import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Navbar from '../components/navbar';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fun = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:3000/getusers/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                setUsers(data.users || [])
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
                <Typography variant="h4" gutterBottom>User List</Typography>
                <Grid container spacing={3}>
                    {users.length > 0 ? (users.map((user, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Typography><LockIcon /> ID: {user._id}</Typography>
                                    <Typography variant="h6"><PersonIcon /> Name: {user.name}</Typography>
                                    <Typography><EmailIcon /> Email: {user.email}</Typography>
                                    <Typography><LockIcon /> Password: {user.password}</Typography>
                                    <Typography><AdminPanelSettingsIcon /> Role: {user.role}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                    ) : (<Typography variant="body2" color="textSecondary">Your User is empty.</Typography>)
                    }
                </Grid>
            </Container>
        </>
    );
};

export default UserList;