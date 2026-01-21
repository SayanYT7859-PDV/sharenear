import React from 'react';

interface Item {
  id: string;
  title: string;
  lat?: number;
  lng?: number;
}

interface MapViewProps {
  items: Item[];
}

const MapView: React.FC<MapViewProps> = ({ items }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
      {/* Placeholder map UI */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-600 text-sm">Map View</p>
          <p className="text-gray-400 text-xs mt-1">
            {items.length > 0 
              ? `${items.length} item(s) nearby` 
              : 'No items to display'}
          </p>
        </div>
      </div>
      
      {/* Simulated map markers */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold"
          style={{
            top: `${20 + (index * 15) % 60}%`,
            left: `${20 + (index * 20) % 60}%`,
          }}
          title={item.title}
        >
          📍
        </div>
      ))}
    </div>
  );
};

export default MapView;
