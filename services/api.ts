import axios from 'axios';

const API_BASE_URL = 'https://api.nutritionix.com/v1_1';
const APP_ID = 'tu_app_id'; // Registra una cuenta en Nutritionix para obtener estas credenciales
const APP_KEY = 'tu_app_key';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-app-id': APP_ID,
    'x-app-key': APP_KEY,
  },
});

export const searchFoods = async (query: string) => {
  try {
    const response = await api.post('/search', {
      query,
      fields: ['item_name', 'nf_calories', 'nf_protein', 'nf_total_carbohydrate', 'nf_total_fat'],
      sort: {
        field: 'nf_calories',
        order: 'asc',
      },
    });
    return response.data.hits.map((hit: any) => ({
      id: hit._id,
      name: hit.fields.item_name,
      calories: hit.fields.nf_calories,
      protein: hit.fields.nf_protein,
      carbs: hit.fields.nf_total_carbohydrate,
      fat: hit.fields.nf_total_fat,
    }));
  } catch (error) {
    console.error('Error searching foods:', error);
    return [];
  }
};

export const getFoodDetails = async (id: string) => {
  try {
    const response = await api.get(`/item?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting food details:', error);
    return null;
  }
};