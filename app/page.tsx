// Home Page Component
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import Head from 'next/head';

// Home Page Component
const Home = () => {
    const products = [
        {
            id: '1',
            name: 'Recycled fabric tote shopper',
            description: 'This tote bag is made by Social Enterprise Trashy Bags...',
            price: '$0.00',
        },
        {
            id: '2',
            name: 'Plastic Bottle Chandelier',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$0.00',
        },
        {
            id: '3',
            name: 'Tire Garden Planters',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: '$0.00',
        },
        {
            id: '4',
            name: 'Upcycled Bracelet',
            description: 'Stylish bracelet made from reclaimed materials.',
            price: '$0.00',
        },
        {
            id: '5',
            name: 'Tin Can Lanterns',
            description: 'Decorative lanterns crafted from used tin cans.',
            price: '$0.00',
        },
        {
            id: '6',
            name: 'Coming Soon',
            description: 'More eco-friendly products are on the way!',
            price: '$0.00',
        },
    ];

    return (
        <>
            <Head>
                <title>EcoCycle - Sustainable Products</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow">
                    <section className="container mx-auto py-8">
                        <ProductGrid products={products} />
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Home;