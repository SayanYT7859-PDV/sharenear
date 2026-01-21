import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const AddItem = React.lazy(() => import('./pages/AddItem'));
const ItemDetail = React.lazy(() => import('./pages/ItemDetail'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Auth = React.lazy(() => import('./pages/Auth'));

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/add',
        element: <AddItem />,
      },
      {
        path: '/item/:id',
        element: <ItemDetail />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;