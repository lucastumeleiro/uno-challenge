import { useEffect, useState } from "react";

interface ApiResponse {
  message: string;
  timestamp: string;
  status: string;
}

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/teste")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">UNO Challenge</h1>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            API Response:
          </h2>
          {loading && <p className="text-gray-500 animate-pulse">Loading...</p>}
          {error && (
            <div className="text-red-500 p-3 bg-red-50 rounded">
              Error: {error}
            </div>
          )}
          {data && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Message:</span>
                <span className="text-green-600 font-bold">{data.message}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Status:</span>
                <span className="text-blue-600">{data.status}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Timestamp:</span>
                <span className="text-gray-500 text-sm">{data.timestamp}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
