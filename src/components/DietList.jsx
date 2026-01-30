import { useState, useEffect } from 'react';
import dietService from '../services/dietService';

const DietList = ({ onEdit, refreshTrigger }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all records
  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dietService.getAllRecords();
      setRecords(data);
    } catch (err) {
      setError('Failed to fetch records. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await dietService.deleteRecord(id);
        fetchRecords(); // Refresh the list
      } catch (err) {
        alert('Failed to delete record. Please try again.');
        console.error(err);
      }
    }
  };

  // Format meal type for display
  const formatMealType = (mealType) => {
    return mealType.charAt(0) + mealType.slice(1).toLowerCase();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate total calories
  const totalCalories = records.reduce((sum, record) => sum + record.calories, 0);

  useEffect(() => {
    fetchRecords();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <h2 className="text-2xl font-bold">Diet Records</h2>
        <p className="text-blue-100 text-sm mt-1">Total Calories: {totalCalories} kcal</p>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-4 text-lg font-medium">No diet records found</p>
          <p className="mt-2 text-sm">Create your first record to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Food Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.foodName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.calories} kcal</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${record.mealType === 'BREAKFAST' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${record.mealType === 'LUNCH' ? 'bg-green-100 text-green-800' : ''}
                      ${record.mealType === 'DINNER' ? 'bg-blue-100 text-blue-800' : ''}
                      ${record.mealType === 'SNACK' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {formatMealType(record.mealType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(record)}
                      className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DietList;
