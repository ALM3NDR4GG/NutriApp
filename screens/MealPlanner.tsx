import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MealPlanCard from '@/components/MealPlanCard';
import { calculateMealNutrition, calculateDailyNutrition, NutritionInfo } from '@/services/nutritionService';

export default function MealPlanner() {
  const [meals, setMeals] = useState([
    {
      id: '1',
      name: 'Desayuno',
      foods: ['1', '2'], // IDs de alimentos
    },
    {
      id: '2',
      name: 'Almuerzo',
      foods: ['2', '3'],
    },
    {
      id: '3',
      name: 'Cena',
      foods: ['3'],
    },
  ]);

  // Calcular nutrición para cada comida
  const mealsWithNutrition = meals.map(meal => ({
    ...meal,
    nutrition: calculateMealNutrition(meal.foods)
  }));

  // Calcular total diario
  const dailyNutrition = calculateDailyNutrition(meals);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText type="title">Plan de Comidas</ThemedText>
        <ThemedText style={styles.summary}>
          Total diario: {dailyNutrition.calories} kcal
          {` (Proteína: ${dailyNutrition.protein}g | Carbos: ${dailyNutrition.carbs}g | Grasas: ${dailyNutrition.fat}g)`}
        </ThemedText>
        
        {mealsWithNutrition.map(meal => (
          <MealPlanCard 
            key={meal.id}
            meal={meal}
            style={styles.mealCard}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  summary: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  mealCard: {
    marginVertical: 8,
  },
});