import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { ThemedView } from '../components/ThemedView'; // Update the path to the correct location
import { ThemedText } from '../components/ThemedText';
import { NutritionInfo, LOCAL_FOOD_DB } from '@/services/nutritionService';
import { Ionicons } from '@expo/vector-icons';

type MealPlanCardProps = {
  meal?: {  // Hacer meal opcional
    id: string;
    name: string;
    foods: string[];
    nutrition?: NutritionInfo;
    time?: string;
  };
  style?: ViewStyle;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
};

export default function MealPlanCard({ 
  meal, 
  style, 
  onEdit, 
  onDelete, 
  showActions = true 
}: MealPlanCardProps) {
  // Si meal es undefined, mostrar un mensaje o retornar null
  if (!meal) {
    return (
      <ThemedView style={[styles.card, style]}>
        <ThemedText>No hay información de comida disponible</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.card, style]}>
      {/* Header con nombre de comida y tiempo */}
      <View style={styles.header}>
        <View>
          <ThemedText type="defaultSemiBold" style={styles.mealName}>
            {meal.name || 'Comida sin nombre'} {/* Fallback para name */}
          </ThemedText>
          {meal.time && (
            <ThemedText style={styles.mealTime}>
              <Ionicons name="time-outline" size={14} /> {meal.time}
            </ThemedText>
          )}
        </View>
        
        {meal.nutrition && (
          <ThemedText style={styles.calories}>
            {meal.nutrition.calories} kcal
          </ThemedText>
        )}
      </View>
      
      {/* Lista de alimentos */}
      <View style={styles.foodsContainer}>
        {meal.foods?.map((foodId) => {  // Operador opcional para foods
          const food = LOCAL_FOOD_DB?.find(f => f.id === foodId);  // Operador opcional para LOCAL_FOOD_DB
          return (
            <View key={`${meal.id}-${foodId}`} style={styles.foodItem}>
              <ThemedText style={styles.foodBullet}>•</ThemedText>
              <ThemedText style={styles.foodName}>
                {food?.name || `Alimento no encontrado (ID: ${foodId})`}  {/* Fallback para food.name */}
              </ThemedText>
              {food?.calories && (
                <ThemedText style={styles.foodCalories}>
                  {food.calories} kcal
                </ThemedText>
              )}
            </View>
          );
        })}
      </View>
      
      {/* Detalles nutricionales */}
      {meal.nutrition && (
        <View style={styles.nutritionDetails}>
          <View style={styles.nutritionItem}>
            <ThemedText style={styles.nutritionLabel}>Proteína</ThemedText>
            <ThemedText style={styles.nutritionValue}>
              {meal.nutrition.protein}g
            </ThemedText>
          </View>
          <View style={styles.nutritionItem}>
            <ThemedText style={styles.nutritionLabel}>Carbos</ThemedText>
            <ThemedText style={styles.nutritionValue}>
              {meal.nutrition.carbs}g
            </ThemedText>
          </View>
          <View style={styles.nutritionItem}>
            <ThemedText style={styles.nutritionLabel}>Grasas</ThemedText>
            <ThemedText style={styles.nutritionValue}>
              {meal.nutrition.fat}g
            </ThemedText>
          </View>
        </View>
      )}
      
      {/* Acciones (editar/eliminar) */}
      {showActions && (onEdit || onDelete) && (
        <View style={styles.actionsContainer}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Ionicons name="create-outline" size={20} color="#4CAF50" />
              <ThemedText style={styles.actionText}>Editar</ThemedText>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={[styles.actionButton, styles.deleteButton]}>
              <Ionicons name="trash-outline" size={20} color="#F44336" />
              <ThemedText style={[styles.actionText, styles.deleteText]}>Eliminar</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  mealTime: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  calories: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  foodsContainer: {
    marginBottom: 12,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  foodBullet: {
    marginRight: 8,
    color: '#4CAF50',
  },
  foodName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  foodCalories: {
    fontSize: 13,
    color: '#757575',
    marginLeft: 8,
  },
  nutritionDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nutritionLabel: {
    fontSize: 13,
    color: '#666',
  },
  nutritionValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#2c3e50',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteText: {
    color: '#F44336',
  },
});