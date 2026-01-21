import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming authHelpers exists in firebase folder
import { signInDemo } from '../firebase/authHelpers';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInDemo();
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-500 mb-8">Sign in to ShareNear</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleDemo}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Continue as Demo'}
        </button>
      </div>
    </div>
  );
};

export default Auth;