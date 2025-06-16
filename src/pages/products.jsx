import { Grid, Box, } from "@mui/material";
import Sidebar from '../components/sidebar'
import ProductsList from '../components/productsList'
import Navbar from "../components/navbar";
import Footer from '../components/footer';


const Products = () => {

    return (
        <>
            <Box sx={{ width: '100%', overflowX: 'hidden' }}>
                <Navbar />
                <Grid display={'grid'} gridTemplateColumns={'1fr 5fr'}>
                    <Sidebar />
                    <ProductsList />
                </Grid>
            </Box >
            <Footer />
        </>

    );
}

export default Products;