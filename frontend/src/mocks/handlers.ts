import { http, HttpResponse } from 'msw'
import type { Product } from '../types/Product'

const fake: Product[] = Array.from({length:24}).map((_,i) => ({
    _id: String(i+1),
    name: `Producto ${i+1}`,
    price: 1999 + i * 100,
    image: `https://picsum.photos/seed/${i}/400/300`,
    //unitOfMeasure: i % 2 ? 'kg' : 'unit',
    //category: i % 2 ? 'snacks' : 'frutos-secos',
    stock: 10 + i,
    glutenFree: i % 2 ? true : false,
    brand: i % 2 ? 'Dicomere' : 'Cuarto creciente'
}))

export const handlers = [
    http.get('/api/products', ({request}) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page') ?? '1');
        const pageSize = Number(url.searchParams.get('pageSize') ?? '12');
        const start = (page - 1) * pageSize;
        const items = fake.slice(start, start + pageSize);
        return HttpResponse.json({ items, total: fake.length });
    })
]