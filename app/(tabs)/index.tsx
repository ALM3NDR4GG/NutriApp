import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NutritionFacts from '@/components/NutritionFacts';
import MealPlanCard from '@/components/MealPlanCard';

export default function HomeScreen() {
  const dailyNutrition = {
    calories: 1850,
    protein: 120,
    carbs: 200,
    fats: 50,
  };

  const todaysMeals = [
    { id: '1', name: 'Desayuno', foods: ['Avena', 'Plátano', 'Almendras'] },
    { id: '2', name: 'Almuerzo', foods: ['Pollo a la plancha', 'Arroz integral', 'Ensalada'] },
    { id: '3', name: 'Cena', foods: ['Salmón', 'Quinoa', 'Espárragos'] },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText type="title">Bienvenido a NutriApp</ThemedText>
        <ThemedText>Tu resumen nutricional de hoy:</ThemedText>
        
        <NutritionFacts nutrition={dailyNutrition} />
        
        <ThemedText type="subtitle" style={styles.sectionTitle}>Plan de comidas de hoy</ThemedText>
        {todaysMeals.map(meal => (
          <MealPlanCard key={meal.id} meal={meal} />
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
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
});