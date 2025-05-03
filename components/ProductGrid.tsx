// ProductGrid Component
import React from 'react';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
}

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:translate-y-[-5px] hover:shadow-lg cursor-pointer">
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                            {/* Replace this with an actual image, perhaps using Next.js's <Image> component */}
                            <span className="text-sm italic text-gray-500">Image Placeholder</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-emerald-600 mb-2 line-clamp-2">
                                {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {product.description}
                            </p>
                            <p className="text-emerald-600 font-bold text-md whitespace-nowrap">
                                {product.price}
                            </p>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
};

export default ProductGrid;