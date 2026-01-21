import React from 'react';
// Assuming MobileNetPreview exists in components
import MobileNetPreview from '../components/MobileNetPreview';
import { useNavigate } from 'react-router-dom';

const AddItem: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-md mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        &larr; Back
      </button>
      <h1 className="text-2xl font-bold mb-6">List an Item</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-medium mb-2">Photo & AI Tagging</h2>
        <div className="mb-4">
          <MobileNetPreview />
        </div>
      </div>
    </div>
  );
};

export default AddItem;