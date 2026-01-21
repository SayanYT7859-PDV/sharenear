import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-md mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        &larr; Back
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Item Details</h1>
        <p className="text-gray-500 mb-6">Item ID: {id}</p>

        <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center text-gray-400">
          Item Image Placeholder
        </div>

        <div className="mt-6">
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Request Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;