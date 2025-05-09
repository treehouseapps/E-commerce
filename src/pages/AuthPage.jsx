import React, { useState } from 'react';
import {
    Container,
    TextField,
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
import Button from '../components/Button'
import Footer from '../components/footer';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    // Login
    const [email, setEmail] = useState('abebe@gmail.com');
    const [password, setPassword] = useState('123456');

    // Register
    const [name, setName] = useState('Abebe');
    const [regEmail, setRegEmail] = useState('abebe@gmail.com');
    const [regPassword, setRegPassword] = useState('123456');

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
                    window.location.reload();
                }
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await fetch(url + 'signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email: regEmail, password: regPassword })
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
                    <Typography variant="h4" align="center" gutterBottom fontFamily={'Quicksand'} fontWeight={600}>
                        {isLogin ? (
                            <>
                                <LoginIcon sx={{ fontSize: 40, verticalAlign: 'middle' }} /> Login
                            </>
                        ) : (
                            <>
                                <PersonAddIcon sx={{ fontSize: 40, verticalAlign: 'middle' }} /> Register
                            </>
                        )}
                    </Typography>

                    <Box component="form" sx={{ mt: 2 }} noValidate>
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
                            </>
                        )}
                        <Button onClick={handleSubmit} text={loading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
                            sx={{ mt: 3, width: '100%' }}
                            icon={isLogin ? <LoginIcon /> : <PersonAddIcon />}
                        />
                    </Box>
                    <Typography align="center" sx={{ mt: 2 }} fontFamily={'Quicksand'}>
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
            </Container >
            <Footer />
        </>
    );
};

export default AuthPage;
