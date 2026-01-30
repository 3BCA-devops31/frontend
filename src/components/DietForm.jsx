import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import dietService from '../services/dietService';

const DietForm = ({ editRecord, onSuccess, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      foodName: '',
      calories: '',
      mealType: 'BREAKFAST',
      date: new Date().toISOString().split('T')[0]
    }
  });

  const isEditMode = !!editRecord;

  // Populate form when editing
  useEffect(() => {
    if (editRecord) {
      reset({
        foodName: editRecord.foodName,
        calories: editRecord.calories,
        mealType: editRecord.mealType,
        date: editRecord.date
      });
    } else {
      reset({
        foodName: '',
        calories: '',
        mealType: 'BREAKFAST',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editRecord, reset]);

  const onSubmit = async (data) => {
    try {
      // Convert calories to integer
      const recordData = {
        ...data,
        calories: parseInt(data.calories, 10)
      };

      if (isEditMode) {
        await dietService.updateRecord(editRecord.id, recordData);
      } else {
        await dietService.createRecord(recordData);
      }

      reset();
      onSuccess();
    } catch (error) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record. Please try again.`);
      console.error(error);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <h2 className="text-2xl font-bold">
          {isEditMode ? 'Edit Diet Record' : 'Add New Diet Record'}
        </h2>
        <p className="text-green-100 text-sm mt-1">
          {isEditMode ? 'Update the details below' : 'Fill in the details to track your meal'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="space-y-6">
          {/* Food Name */}
          <div>
            <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-2">
              Food Name <span className="text-red-500">*</span>
            </label>
            <input
              id="foodName"
              type="text"
              {...register('foodName', { 
                required: 'Food name is required',
                minLength: { value: 2, message: 'Food name must be at least 2 characters' }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.foodName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Grilled Chicken Salad"
            />
            {errors.foodName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.foodName.message}
              </p>
            )}
          </div>

          {/* Calories */}
          <div>
            <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-2">
              Calories (kcal) <span className="text-red-500">*</span>
            </label>
            <input
              id="calories"
              type="number"
              {...register('calories', { 
                required: 'Calories are required',
                min: { value: 1, message: 'Calories must be at least 1' },
                max: { value: 10000, message: 'Calories must be less than 10000' }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.calories ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 350"
            />
            {errors.calories && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.calories.message}
              </p>
            )}
          </div>

          {/* Meal Type */}
          <div>
            <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-2">
              Meal Type <span className="text-red-500">*</span>
            </label>
            <select
              id="mealType"
              {...register('mealType', { required: 'Meal type is required' })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.mealType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="BREAKFAST">Breakfast</option>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
              <option value="SNACK">Snack</option>
            </select>
            {errors.mealType && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.mealType.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              {...register('date', { required: 'Date is required' })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.date.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium shadow-md ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              isEditMode ? 'Update Record' : 'Create Record'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DietForm;
