import React from "react";

interface Category {
    name: string;
    subcategories: Category[];
}

interface ProductCardProps {
    name: string;
    brand: string;
    price: number;
    description: string;
    category: Category;
    unitOfMeasure: string;
    stock: number;
    image: string;
    glutenFree: boolean;
    onAdd?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    name,
    brand,
    price,
    //description,
    //category,
    //unitOfMeasure,
    //stock,
    image,
    glutenFree,
    onAdd,
}) => {
    return (
        <div
            style={{
                width: 220,
                borderRadius: 14,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* immagen */}
            <div
                style={{
                    width: "100%",
                    height: 130,
                    overflow: "hidden",
                }}
            >
                <img
                    src={image}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>

            {/* info */}
            <div
                style={{
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
                <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
                    {name}
                </p>
                <p style={{ fontSize: 14, color: "#555", margin: 0 }}>
                    {brand}
                </p>

                {/* SIN / CON TACC */}
                <div style={{ marginTop: 4 }}>
                    {glutenFree && (
                        <img
                            src="/public/icons/sin-tacc.png"
                            alt="Sin TACC"
                            style={{ width: 42 }}
                        />
                    )}
                </div>

                {/* precio + botón de comprar */}
                <div
                    style={{
                        marginTop: 6,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <p style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                        ${price.toLocaleString("es-AR")}
                    </p>

                    <button
                        onClick={onAdd}
                        style={{
                            background: "#ffffff",
                            border: "1px solid #ccc",
                            borderRadius: 10,
                            padding: "6px 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            cursor: "pointer",
                        }}
                    >
                        🛒+
                    </button>
                </div>
            </div>
        </div>
    );
};
