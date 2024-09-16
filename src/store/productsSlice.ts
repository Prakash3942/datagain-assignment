import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { saveProductsToStorage } from '../utils/localStorage';

interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: [], // Initialize with an empty array
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            saveProductsToStorage(state.products);
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
            saveProductsToStorage(state.products);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index >= 0) {
                state.products[index] = action.payload;
                saveProductsToStorage(state.products);
            }
        },
        deleteProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter(p => p.id !== action.payload);
            saveProductsToStorage(state.products);
        },
    },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
