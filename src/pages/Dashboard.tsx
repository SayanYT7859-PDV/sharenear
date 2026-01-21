import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to your user dashboard.</p>
      
      <div className="space-y-2">
         <Link to="/" className="block text-blue-600 underline">
           Return Home
         </Link>
      </div>
    </div>
  );
};

export default Dashboard;