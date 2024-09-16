// src/utils/localStorage.ts
import { Product } from '../types/Product';

const PRODUCTS_STORAGE_KEY = 'products';

export const loadProductsFromStorage = (): Product[] => {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
};

export const saveProductsToStorage = (products: Product[]) => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};
