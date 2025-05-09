"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { useParams } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/products/${id}/`)
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  

  const handleQuantityChange = (value: number) => {
    if (product && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20">Error: {error}</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <>
      <Head>
        <title>{product.name} - EcoCycle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow">
          <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="h-64 sm:h-80 md:h-96 flex justify-center items-center overflow-hidden rounded-lg shadow">
                {product.image ? (
                  <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No image available</span>
                )}
              </div>

              {/* Product Details */}
              <div className="px-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-700 mb-6">{product.description}</p>
                <p className="text-xl sm:text-2xl font-semibold text-emerald-600 mb-4">
                  ฿{parseFloat(product.price).toFixed(2)}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-6">
                  Available: {product.stock}
                </p>

                {/* Quantity Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center w-full sm:w-auto">
                    <button
                      className="px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-l"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 sm:px-4 py-2 bg-white text-center min-w-[40px] sm:min-w-[50px] text-gray-700">
                      {quantity}
                    </span>
                    <button
                      className="px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-r"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded text-center"
                    onClick={() => {
                      alert(`Added ${quantity} of ${product.name} to cart!`);
                      setQuantity(1);
                    }}
                    disabled={quantity <= 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetailPage;
