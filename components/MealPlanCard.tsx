import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { NutritionInfo, LOCAL_FOOD_DB } from '@/services/nutritionService';

type MealPlanCardProps = {
  meal: {
    id: string;
    name: string;
    foods: string[];
    nutrition?: NutritionInfo;
  };
  style?: ViewStyle;
};

export default function MealPlanCard({ meal, style }: MealPlanCardProps) {
  return (
    <ThemedView style={[styles.card, style]}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold">{meal.name}</ThemedText>
        {meal.nutrition && (
          <ThemedText style={styles.calories}>
            {meal.nutrition.calories} kcal
          </ThemedText>
        )}
      </View>
      
      {meal.foods.map((foodId) => {
        const food = LOCAL_FOOD_DB.find(f => f.id === foodId);
        return (
          <ThemedText key={`${meal.id}-${foodId}`} style={styles.foodItem}>
            • {food ? food.name : `ID: ${foodId}`}
          </ThemedText>
        );
      })}
      
      {meal.nutrition && (
        <View style={styles.nutritionDetails}>
          <ThemedText style={styles.detailText}>Proteína: {meal.nutrition.protein}g</ThemedText>
          <ThemedText style={styles.detailText}>Carbos: {meal.nutrition.carbs}g</ThemedText>
          <ThemedText style={styles.detailText}>Grasas: {meal.nutrition.fat}g</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodItem: {
    marginLeft: 8,
    marginVertical: 2,
  },
  calories: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  nutritionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
});