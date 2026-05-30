import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Button from "../components/Button";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { CartContext } from "../context/CartContext";
import { useUser } from "../context/userContext";
import { Endpoints } from "../api/endpoints";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user } = useUser();
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
  });
  console.log(user);
  const deliveryFee = 5.0; // optional fixed fee

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [cart]);

  const total = useMemo(
    () => subtotal + (cart.length ? deliveryFee : 0),
    [subtotal, cart.length],
  );

  const handleChange = (e) =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) {
      setCustomer((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  if (!localStorage.getItem("token")) {
    return <Navigate to={Endpoints.Auth} replace />;
  }

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "80vh" }}>
        <Paper elevation={3} sx={{ maxWidth: 1100, mx: "auto", p: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight={700} mb={2}>
            Checkout
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Box component="form" display="grid" gap={2}>
                <Typography variant="h6" fontWeight={600}>
                  Customer Information
                </Typography>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={customer.fullName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  fullWidth
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" fontWeight={600}>
                  Shipping Information
                </Typography>
                <TextField
                  label="Address"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="City"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Region"
                  name="region"
                  value={customer.region}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Order Summary
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                  {cart.length > 0 ? (
                    cart.map((item, i) => (
                      <Box
                        key={i}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography fontWeight={600}>
                          {item.product.name} x {item.quantity}
                        </Typography>
                        <Typography>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography color="textSecondary">
                      Your cart is empty.
                    </Typography>
                  )}

                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="textSecondary">Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="textSecondary">Delivery fee</Typography>
                    <Typography>
                      ${cart.length ? deliveryFee.toFixed(2) : "0.00"}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box display="flex" gap={1} mt={2}>
                    <Button
                      onClick={() => navigate(Endpoints.products)}
                      text={"← Back to Cart"}
                      sx={{ flex: 1 }}
                    />
                    <Button
                      onClick={() => navigate(Endpoints.payment)}
                      text={"Continue to Payment →"}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Checkout;
