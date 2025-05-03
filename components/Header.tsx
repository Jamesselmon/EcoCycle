import React from 'react';
import Link from 'next/link';

// Header Component
const Header = () => {
    return (
        <header className="bg-white text-gray-800 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <h1 className="text-2xl font-bold mr-4 text-emerald-600">EcoCycle</h1>
                <nav className="flex flex-wrap justify-center sm:justify-start">
                    <ul className="flex space-x-4 sm:space-x-6 flex-wrap">
                        <li><Link href="/" className="hover:text-emerald-500 transition-colors whitespace-nowrap">Home</Link></li>
                        <li><Link href="/products" className="hover:text-emerald-500 transition-colors whitespace-nowrap">Products</Link></li>
                        <li><Link href="/cart" className="hover:text-emerald-500 transition-colors whitespace-nowrap">Cart</Link></li>
                        <li><Link href="/account/login" className="hover:text-emerald-500 transition-colors whitespace-nowrap">Account</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;