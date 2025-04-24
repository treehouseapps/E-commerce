import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    InputAdornment,
    Link
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Navbar from '../components/navbar';
import { Person } from '@mui/icons-material';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    // Login
    const [email, setEmail] = useState('Admin@gmail.com');
    const [password, setPassword] = useState('123456');

    // Register
    const [name, setName] = useState('Abebe');
    const [regEmail, setRegEmail] = useState('abebe@gmail.com');
    const [regPassword, setRegPassword] = useState('123456');
    const [secret, setSecret] = useState('Bekijuniorr');

    // const url = 'https://e-commerce-api-f9qb.onrender.com/'
    const url = 'https://th-ecommerce-api.vercel.app/'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isLogin) {
            try {
                const response = await fetch(url + 'login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })
                const result = await response.json()
                if (result.token) {
                    localStorage.setItem('token', result.token)
                    setLoading(false)
                }
                alert(result.message)
                setLoading(false)
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await fetch(url + 'adminSignup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email: regEmail, password: regPassword, secret })
                });
                const result = await response.json()
                alert(result.message)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {isLogin ? (
                            <>
                                <LoginIcon sx={{ fontSize: 40, verticalAlign: 'middle' }} /> Admin Login
                            </>
                        ) : (
                            <>
                                <PersonAddIcon sx={{ fontSize: 40, verticalAlign: 'middle' }} /> Admin Register
                            </>
                        )}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }} noValidate>
                        {isLogin ? (
                            <>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    margin="normal"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    variant="outlined"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Secret Key"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </>
                        )}

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3 }}
                            startIcon={isLogin ? <LoginIcon /> : <PersonAddIcon />}
                        >
                            {loading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}

                        </Button>
                    </Box>
                    <Typography align="center" sx={{ mt: 2 }}>
                        {isLogin ? (
                            <>
                                Don’t have an account?{' '}
                                <Link component="button" onClick={() => setIsLogin(false)}>
                                    Register here
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <Link component="button" onClick={() => setIsLogin(true)}>
                                    Login here
                                </Link>
                            </>
                        )}
                    </Typography>
                </Paper>
            </Container>
        </>
    );
};

export default AuthPage;
