import React, { useEffect, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Endpoints } from "../api/endpoints";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const id =
      searchParams.get("orderId") ||
      `ORD-${Math.floor(Math.random() * 100000)}`;
    setOrderId(id);

    const today = new Date();
    const delivery = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    setDeliveryDate(
      delivery.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 4,
          backgroundColor: "#f5f5f5",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
              borderTop: "4px solid #4caf50",
            }}
          >
            <Box display="flex" justifyContent="center" mb={2}>
              <CheckCircle
                sx={{
                  fontSize: 80,
                  color: "#4caf50",
                  animation: "pulse 1.5s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                    "100%": { transform: "scale(1)" },
                  },
                }}
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color: "#4caf50",
                mb: 1,
                fontSize: { xs: "28px", sm: "36px" },
              }}
            >
              Order Successfully Placed
            </Typography>

            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ mb: 4, fontSize: "16px" }}
            >
              Thank you for your order! We are preparing your items for
              shipment.
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
              }}
            >
              <Box mb={2}>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  Order ID
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "#f43a09", fontFamily: "monospace" }}
                >
                  {orderId}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  Estimated Delivery
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {deliveryDate}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  2-5 business days
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  Status
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    display: "inline-block",
                    backgroundColor: "#c8e6c9",
                    color: "#2e7d32",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  Processing
                </Typography>
              </Box>
            </Paper>

            <Button
              onClick={() => navigate(Endpoints.Home)}
              text="Continue Shopping"
              sx={{ width: "100%" }}
            />
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default OrderSuccess;
