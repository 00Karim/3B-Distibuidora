import type { Product } from '../types/Product'

export async function fetchProducts(page=1, pageSize=12) {
    const res = await fetch(`/api/products?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) throw new Error('Error al cargar productos');
    return res.json() as Promise<{ items: Product[]; total: number }>;
}