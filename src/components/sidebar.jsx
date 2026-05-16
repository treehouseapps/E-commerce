import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Sidebar = () => {
  const { updateSelectedCategories } = useContext(CartContext);

  const [categories, setCategories] = useState({
    Electronics: false,
    Fashion: false,
    Furniture: false,
    Sports: false,
    Beauty: false,
  });

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;

    setCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const applyFilter = () => {
    const selected = Object.keys(categories).filter((key) => categories[key]);

    updateSelectedCategories(selected);
  };

  const clearFilters = () => {
    const reset = Object.keys(categories).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});

    setCategories(reset);
    updateSelectedCategories([]);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 280,
        p: 3,
        borderRadius: "20px",
        background: "linear-gradient(180deg, #ffffff, #f7f8fc)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          color: "#111827",
        }}
      >
        Filter Products
      </Typography>

      <FormGroup sx={{ flex: 1 }}>
        {Object.keys(categories).map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                name={category}
                checked={categories[category]}
                onChange={handleCategoryChange}
              />
            }
            label={category}
            sx={{
              px: 1,
              borderRadius: "12px",
              transition: "0.2s ease",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          />
        ))}
      </FormGroup>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          mb: 5,
          mr: 5,
        }}
      >
        <Button
          onClick={applyFilter}
          variant="contained"
          sx={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            fontWeight: 600,
          }}
        >
          Apply Filter
        </Button>

        <Button
          onClick={clearFilters}
          variant="outlined"
          sx={{
            borderRadius: "12px",
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
