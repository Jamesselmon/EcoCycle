// Product Page Component
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import Head from 'next/head';

// Product Page Component
const ProductPage = () => {
    const products = [
        {
            id: '1',
            name: 'Product 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$10.00',
        },
        {
            id: '2',
            name: 'Product 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$20.00',
        },
        {
            id: '3',
            name: 'Product 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$30.00',
        },
        {
            id: '4',
            name: 'Product 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$15.00',
        },
        {
            id: '5',
            name: 'Product 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$25.00',
        },
        {
            id: '6',
            name: 'Product 6',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$35.00',
        },
    ];

    return (
        <>
            <Head>
                <title>EcoCycle - Products</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow">
                    <section className="container mx-auto py-8">
                        <div className="mb-8 flex justify-center">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full sm:w-auto max-w-xl px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-gray-700"
                            />
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md shadow-md ml-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                Search
                            </button>
                        </div>
                        <ProductGrid products={products} />
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default ProductPage;