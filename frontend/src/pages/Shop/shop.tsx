import React, { useEffect, useState } from "react";
import { ProductCard } from "./productCards/productCard";
import styles from "./Shop.module.css"; //

interface Category {
    name: string;
    subcategories: Category[];
}

interface ApiProduct {
    id: string; // para usar como key en el map
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

const Shop: React.FC = () => {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/products`
                );
                if (!res.ok) throw new Error("Error al cargar productos");

                const data: ApiProduct[] = await res.json();
                setProducts(data);
            } catch (e: any) {
                setError(e.message || "Error inesperado");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className={styles.shop}>
            <h1>ARMA TU PEDIDO</h1>

            <div className="container my-5">
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
