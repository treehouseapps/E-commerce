import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Radio,
  FormControlLabel,
  FormControl,
  Divider,
  Grid,
} from "@mui/material";
import { CreditCard, LocalAtm, Payment } from "@mui/icons-material";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../api/endpoints";

const paymentMethods = [
  {
    id: "cod",
    label: "Cash On Delivery",
    description: "Pay when you receive your order",
    icon: <LocalAtm sx={{ fontSize: 40, color: "#f43a09" }} />,
  },
  {
    id: "telebirr",
    label: "Telebirr",
    description: "Digital payment via Telebirr (Demo)",
    icon: <Payment sx={{ fontSize: 40, color: "#f43a09" }} />,
  },
  {
    id: "chapa",
    label: "Chapa",
    description: "Fast and secure payment (Demo)",
    icon: <Payment sx={{ fontSize: 40, color: "#f43a09" }} />,
  },
  {
    id: "card",
    label: "Credit Card",
    description: "Visa, Mastercard, etc. (Demo)",
    icon: <CreditCard sx={{ fontSize: 40, color: "#f43a09" }} />,
  },
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [processing, setProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setProcessing(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
      navigate(`${Endpoints.orderSuccess}?orderId=${orderId}`);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "80vh" }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} mb={1}>
              Select Payment Method
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3}>
              Choose your preferred way to pay
            </Typography>

            <FormControl fullWidth>
              <Box display="grid" gap={2}>
                {paymentMethods.map((method) => (
                  <Paper
                    key={method.id}
                    variant="outlined"
                    sx={{
                      p: 3,
                      cursor: "pointer",
                      border:
                        selectedMethod === method.id
                          ? "2px solid #f43a09"
                          : "1px solid #e0e0e0",
                      backgroundColor:
                        selectedMethod === method.id
                          ? "#fff5f0"
                          : "transparent",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "#f43a09",
                        boxShadow: "0 2px 8px rgba(244, 58, 9, 0.1)",
                      },
                    }}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedMethod === method.id}
                          onChange={() => setSelectedMethod(method.id)}
                          sx={{
                            color: "#f43a09",
                            "&.Mui-checked": { color: "#f43a09" },
                          }}
                        />
                      }
                      label={
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={2}
                          flex={1}
                        >
                          {method.icon}
                          <Box>
                            <Typography fontWeight={600}>
                              {method.label}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {method.description}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{ flex: 1, m: 0 }}
                    />
                  </Paper>
                ))}
              </Box>
            </FormControl>

            <Divider sx={{ my: 3 }} />

            <Box
              display="grid"
              gap={2}
              gridTemplateColumns="1fr 1fr"
              sx={{
                "@media (max-width: 600px)": { gridTemplateColumns: "1fr" },
              }}
            >
              <Button
                onClick={() => navigate(Endpoints.checkout)}
                text="← Back to Checkout"
                sx={{ width: "100%" }}
              />
              <Button
                onClick={handlePlaceOrder}
                text={processing ? "Processing..." : "Place Order"}
                disabled={processing}
                sx={{ width: "100%" }}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default PaymentPage;
