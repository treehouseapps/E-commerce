import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useUser } from "../context/userContext";
import { Endpoints } from "../api/endpoints";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Button from "../components/Button";

const API_URL = "https://th-ecommerce-api.vercel.app";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  if (!localStorage.getItem("token")) {
    return <Navigate to={Endpoints.Auth} replace />;
  }

  if (!user && !loading) {
    return <Navigate to={Endpoints.Auth} replace />;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ p: 4 }}>
          <Typography>Loading profile...</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: form.name, email: form.email }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Unable to update profile.");
      setUser(data.user);
      setEditMode(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete your account?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/profile`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Unable to delete account.");
      localStorage.removeItem("token");
      navigate(Endpoints.Home);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ py: 4, backgroundColor: "#f5f5f5", minHeight: "80vh" }}>
        <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Profile
          </Typography>
          <Typography variant="body1" mb={3}>
            Review your account details and update them if needed.
          </Typography>
          <Box display="grid" gap={3}>
            <Box display="grid" gap={2}>
              <Typography variant="h6" fontWeight={600}>
                Account Details
              </Typography>
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
              />
              <TextField
                label="Role"
                value={user.role || "user"}
                fullWidth
                disabled
              />
            </Box>
            <Divider />
            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                onClick={() => setEditMode((prev) => !prev)}
                text={editMode ? "Cancel" : "Edit Account"}
                icon={<Edit />}
                sx={{ flex: 1, minWidth: 160 }}
              />
              {editMode && (
                <Button
                  onClick={handleSave}
                  text="Save Changes"
                  sx={{ flex: 1, minWidth: 160 }}
                />
              )}
              <Button
                onClick={handleDelete}
                text="Delete Account"
                icon={<Delete />}
                sx={{ flex: 1, minWidth: 160, backgroundColor: "#ff4d4d" }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
