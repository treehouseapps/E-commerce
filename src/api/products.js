// const url = 'https://e-commerce-api-f9qb.onrender.com/products/'
const url = 'https://th-ecommerce-api.vercel.app/products/'
export const getAllProducts = async () => {
    try {
        const rawData = await fetch(url);
        const data = await rawData.json()
        return data;
    } catch (error) {
        console.log('error: ' + error)
    }
}
export const getProductsById = async (id) => {
    try {
        const rawData = await fetch(url + id);
        const data = await rawData.json()
        return data;
    } catch (error) {
        console.log('error: ' + error)
    }
}