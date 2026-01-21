import React, { useState, useRef } from 'react';

interface Prediction {
  className: string;
  probability: number;
}

const MobileNetPreview: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate AI tagging (placeholder for actual MobileNet integration)
    setLoading(true);
    setPredictions([]);
    
    // Simulated delay for "AI processing"
    setTimeout(() => {
      // Mock predictions - in production, use TensorFlow.js with MobileNet
      const mockPredictions: Prediction[] = [
        { className: 'household item', probability: 0.85 },
        { className: 'furniture', probability: 0.12 },
        { className: 'electronics', probability: 0.03 },
      ];
      setPredictions(mockPredictions);
      setLoading(false);
    }, 1500);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setImagePreview(null);
    setPredictions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {!imagePreview ? (
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          <span className="text-3xl mb-2">📷</span>
          <span className="text-sm">Tap to add photo</span>
        </button>
      ) : (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-black/70"
          >
            ×
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-sm text-gray-600">Analyzing image...</span>
        </div>
      )}

      {predictions.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-2">AI Suggested Tags:</p>
          <div className="flex flex-wrap gap-2">
            {predictions.map((pred, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {pred.className}
                <span className="ml-1 text-blue-500">
                  {Math.round(pred.probability * 100)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNetPreview;
