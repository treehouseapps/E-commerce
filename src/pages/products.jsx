import { Grid, Box, } from "@mui/material";
import ProductsList from '../components/productsList'
import Navbar from "../components/navbar";


const Products = () => {

    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            <Navbar />
            <Grid container spacing={3} padding={3} sx={{ width: '100%' }}>
                <ProductsList />
            </Grid>
        </Box >

    );
}

export default Products;