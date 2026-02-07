import axios from 'axios';

const API_BASE_URL = 'https://dietandlifestyle-backend.onrender.com/api';

const dietService = {
  // Meal endpoints
  getMeals: async () => {
    const response = await axios.get(`${API_BASE_URL}/diet`);
    return response.data;
  },

  createMeal: async (dietRecord) => {
    const response = await axios.post(`${API_BASE_URL}/diet/saveMeal`, dietRecord);
    return response.data;
  },

  updateMeal: async (id, dietRecord) => {
    const response = await axios.put(`${API_BASE_URL}/diet/${id}`, dietRecord);
    return response.data;
  },

  deleteMeal: async (id) => {
    await axios.delete(`${API_BASE_URL}/diet/deleteMeal/${id}`);
  },

  // Exercise endpoints
  getExercises: async () => {
    const response = await axios.get(`${API_BASE_URL}/diet/exercise`);
    return response.data;
  },

  createExercise: async (exerciseRecord) => {
    const response = await axios.post(`${API_BASE_URL}/diet/saveExercise`, exerciseRecord);
    return response.data;
  },

  updateExercise: async (id, exerciseRecord) => {
    const response = await axios.put(`${API_BASE_URL}/diet/exercise/${id}`, exerciseRecord);
    return response.data;
  },

  deleteExercise: async (id) => {
    await axios.delete(`${API_BASE_URL}/diet/deleteExercise/${id}`);
  },
};

export default dietService;
