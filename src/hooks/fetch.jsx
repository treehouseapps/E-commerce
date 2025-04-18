useEffect(() => {
    const fetchFun = async (data) => {
        try {
            const res = await fetch('https://e-commerce-api-f9qb.onrender.com');
            const data = await res.json();
            console.log(data);
            setArr(data);
        } catch (err) {
            console.error(err);
        }
    }
    fetchFun()
}, [])