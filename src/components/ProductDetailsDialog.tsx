import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogActions,
  Box,
} from "@mui/material";
import { Product } from "../types/Product";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ProductDetailsDialogProps {
  open: boolean;
  handleClose: () => void;
  product: Product | null;
}

const ProductDetailDialog: FC<ProductDetailsDialogProps> = ({
  open,
  handleClose,
  product,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        {product ? (
          <Box
            sx={{
              width: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "300px", height: "250px", marginTop: "10px" }}
            />
            <Typography variant="h6">Name: {product.title}</Typography>
            <Typography variant="subtitle1">Brand: {product.brand}</Typography>
            <Typography variant="subtitle1">
              Category: {product.category}
            </Typography>
            <Typography variant="subtitle1">Price: ${product.price}</Typography>
          </Box>
        ) : (
          <Typography>No product details available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: " #a6eced",
            color: "#000",
            fontWeight: 500,
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailDialog;
