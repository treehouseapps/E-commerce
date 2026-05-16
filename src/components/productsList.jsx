import {
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/products";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import Button from "./Button";

import Sidebar from "../components/sidebar";

const Products = () => {
  const { addToCart, selectedCategories } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
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

  const filteredProducts = products.filter(
    (product) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category),
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 280,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          borderRight: "1px solid #eee",
          backgroundColor: "#fff",
        }}
      >
        <Sidebar />
      </Box>

      <Box
        sx={{
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          px: 2,
          py: 3,
          background:
            "linear-gradient(to bottom, rgb(251, 251, 251), rgb(245, 247, 250))",
        }}
      >
        {/* HEADER */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 1,
          }}
        >
          Discover Products
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b7280",
            mb: 4,
          }}
        >
          Modern collections curated for your lifestyle
        </Typography>

        {/* GRID WRAPPER FIX */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product._id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 320,
                    borderRadius: "20px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    transition: "0.3s ease",

                    "&:hover": {
                      transform: "translateY(-6px)",
                    },
                  }}
                >
                  <Link
                    to={`/products/${product._id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Box
                      sx={{
                        height: 220,
                        width: "100%",
                        background: "#f8fafc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <CardContent>
                      <Typography fontWeight={700}>{product.name}</Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#6b7280", mt: 1 }}
                      >
                        {product.description}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 2,
                          fontWeight: 700,
                          color: "#2563eb",
                        }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </Link>

                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <TextField
                      size="small"
                      type="number"
                      value={quantities[product._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          product._id,
                          parseInt(e.target.value) || 1,
                        )
                      }
                      sx={{ width: 70 }}
                    />

                    <Button
                      text="Add"
                      onClick={() =>
                        addToCart(product, quantities[product._id] || 1)
                      }
                      sx={{
                        flex: 1,
                        ml: 1,
                        background: "#2563eb",
                        color: "white",
                      }}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
