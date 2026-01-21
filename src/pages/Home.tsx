import React from 'react';
// Assuming MapView exists in components or is mocked elsewhere
import MapView from '../components/MapView';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  title: string;
}

const Home: React.FC = () => {
  // Placeholder items array
  const items: Item[] = [];

  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ShareNear</h1>
        <Link to="/login" className="text-blue-600 text-sm">Login</Link>
      </header>

      <div className="h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
        {/* Placeholder for MapView */}
        <MapView items={items} />
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nearby Items</h2>
          <Link to="/add" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            + Add
          </Link>
        </div>
        
        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No items found nearby.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="p-4 bg-white shadow rounded">
                {item.title}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;