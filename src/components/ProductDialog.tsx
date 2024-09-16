import { FC, ChangeEvent, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Product } from "../types/Product";

interface ProductDialogProps {
  open: boolean;
  handleClose: () => void;
  product: Product | null;
  handleAddOrUpdate: (product: Product) => void;
}

const ProductDialog: FC<ProductDialogProps> = ({
  open,
  handleClose,
  product,
  handleAddOrUpdate,
}) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    brand: "",
    category: "",
    price: Number(""),
    thumbnail: "",
  });

  // Validation states
  const [errors, setErrors] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    thumbnail: "",
  });

  // Reset form fields when dialog opens or product changes
  useEffect(() => {
    if (product) {
      setNewProduct({
        title: product.title,
        brand: product.brand,
        category: product.category,
        price: Number(product.price.toString()),
        thumbnail: product.thumbnail,
      });
      setErrors({
        title: "",
        brand: "",
        category: "",
        price: "",
        thumbnail: "",
      });
    } else {
      setNewProduct({
        title: "",
        brand: "",
        category: "",
        price: Number(""),
        thumbnail: "",
      });
      setErrors({
        title: "",
        brand: "",
        category: "",
        price: "",
        thumbnail: "",
      });
    }
  }, [open, product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });

    // Simple validation for required fields
    let error = "";
    if (name === "title" && !value) error = "Name is required.";
    if (name === "brand" && !value) error = "Brand is required.";
    if (name === "category" && !value) error = "Category is required.";

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = () => {
    // Checking errors before submitting
    const hasErrors =
      !newProduct.title || !newProduct.brand || !newProduct.category;

    if (hasErrors) {
      setErrors({
        title: newProduct.title ? "" : "Name is required.",
        brand: newProduct.brand ? "" : "Brand is required.",
        category: newProduct.category ? "" : "Category is required.",
        price: newProduct.price ? "" : "Price is required",
        thumbnail: newProduct.thumbnail ? "" : "Image is required",
      });
      return;
    }

    handleAddOrUpdate({
      id: product?.id || Date.now(),
      title: newProduct.title || "",
      brand: newProduct.brand || "",
      category: newProduct.category || "",
      price: Number(newProduct.price || "0"),
      thumbnail: newProduct.thumbnail || "",
    } as Product);

    // Close dialog after submitting
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Name"
          fullWidth
          variant="standard"
          value={newProduct.title || ""}
          onChange={handleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
        <TextField
          margin="dense"
          name="brand"
          label="Brand"
          fullWidth
          variant="standard"
          value={newProduct.brand || ""}
          onChange={handleChange}
          error={Boolean(errors.brand)}
          helperText={errors.brand}
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          fullWidth
          variant="standard"
          value={newProduct.category || ""}
          onChange={handleChange}
          error={Boolean(errors.category)}
          helperText={errors.category}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          fullWidth
          variant="standard"
          type="number"
          value={newProduct.price || ""}
          onChange={handleChange}
          error={Boolean(errors.price)}
          helperText={errors.price}
        />
        <TextField
          margin="dense"
          name="thumbnail"
          label="Image URL"
          fullWidth
          variant="standard"
          value={newProduct.thumbnail || ""}
          onChange={handleChange}
          error={Boolean(errors.thumbnail)}
          helperText={errors.thumbnail}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ border: "2px solid #a6eced", color: "#000", fontWeight: 500 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={Boolean(errors.title || errors.brand || errors.category)}
          variant="contained"
          sx={{ backgroundColor: " #a6eced", color: "#000", fontWeight: 500 }}
        >
          {product ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
