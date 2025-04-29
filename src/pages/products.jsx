import { Grid, Box, } from "@mui/material";
import ProductsList from '../components/productsList'
import Navbar from "../components/navbar";
import Footer from '../components/footer';


const Products = () => {

    return (
        <>
            <Box sx={{ width: '100%', overflowX: 'hidden' }}>
                <Navbar />
                <Grid display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <ProductsList />
                </Grid>
            </Box >
            <Footer />
        </>

    );
}

export default Products;