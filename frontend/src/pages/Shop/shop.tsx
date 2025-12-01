import React, { useEffect, useState } from "react";
import { ProductCard } from "./productCards/productCard";
import styles from "./shop.module.css";

interface Category {
    name: string;
    subcategories: Category[];
}

interface ApiProduct {
    id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    category: Category;
    unitOfMeasure: string;
    stock: number;
    image: string;
    glutenFree: boolean;
}

interface FiltersState {
    name: string;
    minPrice: string;
    maxPrice: string;
    category: string;
    brand: string;
    glutenFree: string;
}

const Shop: React.FC = () => {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<FiltersState>({
        name: "",
        minPrice: "",
        maxPrice: "",
        category: "",
        brand: "",
        glutenFree: "",
    });

    const fetchProducts = async (currentFilters?: FiltersState) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();

            if (currentFilters) {
                if (currentFilters.name)
                    params.append("name", currentFilters.name);
                if (currentFilters.minPrice)
                    params.append("minPrice", currentFilters.minPrice);
                if (currentFilters.maxPrice)
                    params.append("maxPrice", currentFilters.maxPrice);
                if (currentFilters.category)
                    params.append("category", currentFilters.category);
                if (currentFilters.brand)
                    params.append("brand", currentFilters.brand);
                if (currentFilters.glutenFree)
                    params.append("glutenFree", currentFilters.glutenFree);
            }

            const queryString = params.toString();
            const url = queryString
                ? `${import.meta.env.VITE_API_URL}/products?${queryString}`
                : `${import.meta.env.VITE_API_URL}/products`;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Error al cargar productos");

            const data: ApiProduct[] = await res.json();
            setProducts(data);
        } catch (e: any) {
            setError(e.message || "Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // carga inicial sin filtros
    }, []);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApplyFilters = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts(filters);
    };

    const handleClearFilters = () => {
        const emptyFilters: FiltersState = {
            name: "",
            minPrice: "",
            maxPrice: "",
            category: "",
            brand: "",
            glutenFree: "",
        };
        setFilters(emptyFilters);
        fetchProducts();
    };

    return (
        <section className={styles.shop}>
            <h1>ARMA TU PEDIDO</h1>

            <div className="container my-5">
                <form className="row g-3 mb-4" onSubmit={handleApplyFilters}>
                    <div className="col-12 col-md-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            placeholder="Buscar por nombre"
                        />
                    </div>

                    <div className="col-6 col-md-2">
                        <label className="form-label">Precio mín.</label>
                        <input
                            type="number"
                            className="form-control"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            min={0}
                        />
                    </div>

                    <div className="col-6 col-md-2">
                        <label className="form-label">Precio máx.</label>
                        <input
                            type="number"
                            className="form-control"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            min={0}
                        />
                    </div>

                    <div className="col-12 col-md-2">
                        <label className="form-label">Categoría</label>
                        <input
                            type="text"
                            className="form-control"
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            placeholder="Categoría"
                        />
                    </div>

                    <div className="col-12 col-md-2">
                        <label className="form-label">Marca</label>
                        <input
                            type="text"
                            className="form-control"
                            name="brand"
                            value={filters.brand}
                            onChange={handleFilterChange}
                            placeholder="Marca"
                        />
                    </div>

                    <div className="col-12 col-md-2">
                        <label className="form-label">Libre de gluten</label>
                        <select
                            className="form-select"
                            name="glutenFree"
                            value={filters.glutenFree}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div className="col-12 col-md-3 d-flex align-items-end gap-2">
                        <button type="submit" className="btn btn-primary w-100">
                            Aplicar filtros
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-100"
                            onClick={handleClearFilters}
                        >
                            Limpiar
                        </button>
                    </div>
                </form>

                {loading && <p>Cargando productos...</p>}
                {error && <p className="text-danger">{error}</p>}

                {!loading && !error && (
                    <div className="row g-4">
                        {products.map((p) => (
                            <div
                                className="col-12 col-sm-6 col-md-3"
                                key={p.id}
                            >
                                <ProductCard
                                    name={p.name}
                                    brand={p.brand}
                                    price={p.price}
                                    description={p.description}
                                    category={p.category}
                                    unitOfMeasure={p.unitOfMeasure}
                                    stock={p.stock}
                                    image={p.image}
                                    glutenFree={p.glutenFree}
                                    onAdd={() =>
                                        console.log(
                                            "Producto agregado:",
                                            p.name
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shop;
