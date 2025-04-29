import { Button as MuiButton } from '@mui/material';

const CustomButton = ({ sx, icon, onClick, className, text }) => {
    return (
        <MuiButton
            variant="contained"
            sx={{ ...sx, fontFamily: 'Quicksand', backgroundColor: '#2a9d8f' }}
            startIcon={icon}
            onClick={onClick}
            className={className}
        >
            {text}
        </MuiButton>
    );
}

export default CustomButton;