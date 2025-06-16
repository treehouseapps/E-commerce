import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import Button from './Button'
const Sidebar = () => {
    return (
        <Box height={'100vh'} padding={3} maxwidth={250} boxShadow={'1px 1px 10px 5px lightgray'}>
            <Typography variant="h6" gutterBottom>Filter By</Typography>

            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Men" />
                <FormControlLabel control={<Checkbox />} label="Women" />
                <FormControlLabel control={<Checkbox />} label="Kids" />
                <FormControlLabel control={<Checkbox />} label="Accessories" />
                <FormControlLabel control={<Checkbox />} label="Jewelry" />
            </FormGroup>
            <Button onClick={() => addToCart(item, quantities[item._id] || 1)}
                sx={{ width: '90%', padding: '2px' }} text='Apply Filter' />
        </Box>
    );
};

export default Sidebar;
