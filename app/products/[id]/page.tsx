// Product Detail Page Component
"use client"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import React, { useState,useEffect } from 'react';
import { useRouter,useParams } from 'next/navigation';

const ProductDetailPage = () => {
    const router = useRouter();
    const { id } = useParams(); // Get the product ID from the URL
  
    // Mock product data for testing
    const product = {
      id: '123',
      name: 'Eco-Friendly Water Bottle',
      description:
        'This reusable water bottle is made from recycled materials and is perfect for staying hydrated on the go.  Pellentesque blandit neque faucibus ligula dapibus, convallis vehicula arcu mollis. Curabitur mattis ligula tortor, id mollis nibh dapibus ac. Nullam vel nulla sed mauris bibendum.',
      price: '$15.99',
      available: 100,
      imageUrl: 'https://via.placeholder.com/400x400', // Placeholder image URL
    };
  
    const [quantity, setQuantity] = useState(1); // Start with 1, since user is on detail page
  
    const handleQuantityChange = (value: number) => {
      if (value >= 1 && value <= product.available) {
        setQuantity(value);
      }
    };
  
    // Use useEffect to log the ID, to make sure we are getting it.
    useEffect(() => {
      console.log('Product ID:', id);
    }, [id]);
  
    // If the ID exists, render the product.
    if (!id) {
      return <div>Loading...</div>; // Or a better loading/error state
    }
  
    return (
      <>
        <Head>
          <title>{product.name} - EcoCycle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
  
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow">
            <section className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image  */}
                <div className="h-64 sm:h-80 md:h-96">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full rounded-lg object-contain mx-auto"
                  />
                </div>
  
                {/* Product Details */}
                <div className="px-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-700 mb-6">{product.description}</p>
                  <p className="text-xl sm:text-2xl font-semibold text-emerald-600 mb-4">
                    {product.price}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 mb-6">
                    Available: {product.available}
                  </p>
  
                  {/* Controls container - stack on mobile, horizontal on larger screens */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Quantity controls */}
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
                        disabled={quantity >= product.available}
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Add to Cart button - full width on mobile */}
                    <button
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded text-center"
                      onClick={() => {
                        if (quantity > 0) {
                          alert(`Added ${quantity} of ${product.name} to cart!`);
                          setQuantity(1); //  Reset quantity after adding to cart
                        }
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