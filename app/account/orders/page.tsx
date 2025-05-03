// View All Orders Page Component
"use client"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthCheck from '@/utils/authCheck';

// Order type definition
interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
  deliveryEstimate?: string;
}

const OrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch orders (mock data in this example)
  useEffect(() => {
    // Simulate API call to fetch orders
    setTimeout(() => {
      setOrders([
        {
          id: 'ECO-12345678',
          date: 'May 1, 2025',
          status: 'delivered',
          total: 35.97,
          items: 3,
          trackingNumber: 'TRK-9876543210',
          deliveryEstimate: 'Delivered on Apr 28, 2025'
        },
        {
          id: 'ECO-87654321',
          date: 'Apr 15, 2025',
          status: 'shipped',
          total: 15.99,
          items: 1,
          trackingNumber: 'TRK-5432109876',
          deliveryEstimate: 'Arriving May 5, 2025'
        },
        {
          id: 'ECO-11223344',
          date: 'Mar 22, 2025',
          status: 'delivered',
          total: 67.45,
          items: 4,
          trackingNumber: 'TRK-1122334455',
          deliveryEstimate: 'Delivered on Mar 29, 2025'
        },
        {
          id: 'ECO-55667788',
          date: 'Feb 10, 2025',
          status: 'cancelled',
          total: 29.99,
          items: 2
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Function to get status badge color based on order status
  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  // View order details
  const viewOrderDetails = (orderId: string) => {
    router.push(`/account/orders/${orderId}`);
  };
  
  return (
    <AuthCheck returnUrl="/account/orders">
      <Head>
        <title>My Orders - EcoCycle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">My Orders</h1>
                <p className="text-gray-600">View and track all your EcoCycle orders</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr 
                          key={order.id} 
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => viewOrderDetails(order.id)}
                              className="text-emerald-600 hover:text-emerald-900 transition-colors duration-200"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default OrdersPage;