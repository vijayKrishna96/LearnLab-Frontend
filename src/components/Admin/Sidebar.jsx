import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className={`bg-blue-900 text-white ${isOpen ? 'w-64' : 'w-20'} min-h-screen flex flex-col`}>
        <div className="flex justify-between p-4">
          <span className="font-bold text-lg">Zooper CRM</span>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <nav className="mt-10">
          <Link to="/" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <span className="ml-4">Dashboard</span>
          </Link>
          <Link to="/analytics" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <span className="ml-4">Analytics</span>
          </Link>
          <Link to="/customers" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <span className="ml-4">Customers</span>
          </Link>
          <Link to="/products" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <span className="ml-4">Products</span>
          </Link>
          <Link to="/orders" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <span className="ml-4">Orders</span>
          </Link>
          <Link to="/invoices" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <span className="ml-4">Invoices</span>
          </Link>
          <Link to="/calendar" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <span className="ml-4">Calendar</span>
          </Link>
        </nav>
      </div>
    )  
}

export default Sidebar