export interface Product {
    id: number;
    title: string;
    brand: string;
    category: string;
    price: number;
    thumbnail: string;
}

export interface ModalState {
    open: boolean;
    product: Product | null;
    mode: 'view' | 'edit';
}