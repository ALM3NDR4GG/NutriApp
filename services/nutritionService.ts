import { searchFoods } from './api';
import { saveMeal, getMeals } from './storage';

// Base de datos local para cuando no hay conexión
export const LOCAL_FOOD_DB = [
  {
    id: '1',
    name: 'Manzana',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
  },
  {
    id: '2',
    name: 'Pechuga de pollo (100g)',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  {
    id: '3',
    name: 'Arroz integral (1 taza)',
    calories: 216,
    protein: 5,
    carbs: 44,
    fat: 1.8,
  },
];

/**
 * Busca alimentos en la API o en la base de datos local
 */
export const searchFood = async (query: string) => {
  try {
    const apiResults = await searchFoods(query);
    if (apiResults.length > 0) return apiResults;
    
    return LOCAL_FOOD_DB.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.log('Using local food DB due to API error');
    return LOCAL_FOOD_DB.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  }
};

/**
 * Calcula los valores nutricionales para una comida específica
 */
export const calculateMealNutrition = (foodIds: string[]) => {
  const foods = foodIds.map(id => 
    LOCAL_FOOD_DB.find(food => food.id === id) || 
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return foods.reduce(
    (total, food) => {
      total.calories += food.calories;
      total.protein += food.protein;
      total.carbs += food.carbs;
      total.fat += food.fat;
      return total;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

/**
 * Calcula los valores nutricionales para todo un día (varias comidas)
 */
export const calculateDailyNutrition = (dailyMeals: Array<{ foods: string[] }>) => {
  return dailyMeals.reduce(
    (dailyTotal, meal) => {
      const mealNutrition = calculateMealNutrition(meal.foods);
      dailyTotal.calories += mealNutrition.calories;
      dailyTotal.protein += mealNutrition.protein;
      dailyTotal.carbs += mealNutrition.carbs;
      dailyTotal.fat += mealNutrition.fat;
      return dailyTotal;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

/**
 * Guarda un plan de comidas para una fecha específica
 */
export const saveDailyMeal = async (meal: {
  date: string;
  meals: Array<{ name: string; foods: string[] }>;
}) => {
  await saveMeal(meal);
};

/**
 * Obtiene las comidas guardadas para una fecha específica
 */
export const getDailyMeals = async (date: string) => {
  return await getMeals(date);
};

// Tipos para TypeScript
export type NutritionInfo = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Meal = {
  name: string;
  foods: string[];
  nutrition?: NutritionInfo;
};

export type DailyMealPlan = {
  date: string;
  meals: Meal[];
  totalNutrition?: NutritionInfo;
};