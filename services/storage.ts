import AsyncStorage from '@react-native-async-storage/async-storage';

const MEAL_STORAGE_KEY = '@NutriApp:meals';

export const saveMeal = async (mealData: any) => {
  try {
    const existingMeals = await getMeals(mealData.date);
    const updatedMeals = existingMeals
      ? [...existingMeals, ...mealData.meals]
      : mealData.meals;
    
    await AsyncStorage.setItem(
      `${MEAL_STORAGE_KEY}:${mealData.date}`,
      JSON.stringify(updatedMeals)
    );
  } catch (error) {
    console.error('Error saving meal:', error);
  }
};

export const getMeals = async (date: string) => {
  try {
    const meals = await AsyncStorage.getItem(`${MEAL_STORAGE_KEY}:${date}`);
    return meals ? JSON.parse(meals) : null;
  } catch (error) {
    console.error('Error getting meals:', error);
    return null;
  }
};

export const clearAllMeals = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const mealKeys = keys.filter(key => key.startsWith(MEAL_STORAGE_KEY));
    await AsyncStorage.multiRemove(mealKeys);
  } catch (error) {
    console.error('Error clearing meals:', error);
  }
};