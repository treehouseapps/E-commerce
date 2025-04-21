import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (

        <Button
            variant="contained"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
        >
            Logout
        </Button>

    );
}

export default Logout;