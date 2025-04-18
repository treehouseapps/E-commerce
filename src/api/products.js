const processenvURL = 'http://localhost:3000/products/'
export const getAllProducts = async () => {
    try {
        const rawData = await fetch(processenvURL);
        const data = await rawData.json()
        return data;
    } catch (error) {
        console.log('error: ' + error)
    }
}
export const getProductsById = async (id) => {
    try {
        const rawData = await fetch(processenvURL + id);
        const data = await rawData.json()
        return data;
    } catch (error) {
        console.log('error: ' + error)
    }
}