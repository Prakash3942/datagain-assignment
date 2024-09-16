import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../store/productsSlice";
import { loadProductsFromStorage } from "../utils/localStorage";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import ProductDialog from "./ProductDialog";
import { Product } from "../types/Product";
import ProductDetailDialog from "./ProductDetailsDialog";

const tableRowCell = [
  { name: "ID" },
  { name: "Product Name" },
  { name: "Brand" },
  { name: "Category" },
  { name: "Price" },
  { name: "Image" },
  { name: "Actions" },
];

const ProductTable: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  const [open, setOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load products from local storage on client-side after component mounts
  useEffect(() => {
    const storedProducts = loadProductsFromStorage();
    dispatch(setProducts(storedProducts));
  }, [dispatch]);

  const handleOpen = (product?: Product) => {
    setEditingProduct(product || null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleDetailsOpen = (product: Product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => setDetailsOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add New Product
      </Button>
      {products.length === 0 ? (
        <Typography variant="h6" component="p" style={{ marginTop: "20px" }}>
          Please add products
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                {tableRowCell.map((data, index: any) => (
                  <TableCell
                    sx={{ fontSize: "16px", fontWeight: 500, color: "#000" }}
                    id={index}
                  >
                    {data.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDetailsOpen(product)}>
                      <Visibility sx={{ color: "blue" }} />
                    </IconButton>
                    <IconButton onClick={() => handleOpen(product)}>
                      <Edit sx={{ color: "green" }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product.id)}>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ProductDialog
        open={open}
        handleClose={handleClose}
        product={editingProduct}
        handleAddOrUpdate={(product: Product) => {
          if (editingProduct) {
            dispatch(updateProduct(product));
          } else {
            dispatch(addProduct(product));
          }
          handleClose();
        }}
      />

      <ProductDetailDialog
        open={detailsOpen}
        handleClose={handleDetailsClose}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductTable;
