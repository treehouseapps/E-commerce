import {
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Skeleton,
  Divider,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/products";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import Button from "./Button";
const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  let array = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products || []);

        console.log("Fetched products:", data.products); // Debugging log
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleMouseEnter = (id) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  return (
    <Grid container spacing={3} padding={3} sx={{ width: "100%" }}>
      {products.length > 0 ? (
        products.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={item._id}
            onMouseEnter={() => handleMouseEnter(item._id)}
            onMouseLeave={handleMouseLeave}
          >
            <Card
              sx={{
                height: "max-content",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 2,
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <Link
                to={`/products/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    sx={{
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "0.3s ease",
                      },
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                </CardContent>
                <Divider />
              </Link>
              <Box pl={1}>
                {hoveredItem === item._id ? (
                  <CardActions sx={{ padding: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        gap: 1,
                      }}
                    >
                      <TextField
                        type="number"
                        size="small"
                        inputProps={{ min: 1 }}
                        value={quantities[item._id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        sx={{ width: "80px" }}
                      />
                      <Button
                        onClick={() =>
                          addToCart(item, quantities[item._id] || 1)
                        }
                        sx={{
                          flexGrow: 0,
                          fontSize: "small",
                          padding: "6px 12px",
                        }}
                        text="Add to Cart"
                      />
                    </Box>
                  </CardActions>
                ) : (
                  <Box sx={{ padding: 2, paddingTop: 0 }}>
                    <Typography
                      fontFamily={"Trebuchet MS"}
                      fontSize={16}
                      fontWeight={500}
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginBottom: 0.5,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontFamily={"Trebuchet MS"}
                      fontSize={14}
                      color="primary"
                      fontWeight={600}
                    >
                      Price: ${item.price}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {array.map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <div style={{ marginBottom: "1rem" }}>
                  <Skeleton variant="rectangular" width={250} height={150} />
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={20}
                    style={{ marginTop: 8 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={20}
                    style={{ marginTop: 8 }}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Products;
