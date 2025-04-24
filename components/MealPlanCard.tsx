import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

type Meal = {
  id: string;
  name: string;
  foods: string[];
  time?: string;
  image?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
};

type MealPlanCardProps = {
  meal: Meal;
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
  showActions = false 
}: MealPlanCardProps) {
  return (
    <ThemedView style={[styles.card, style]}>
      {/* Imagen de la comida (si existe) */}
      {meal.image && (
        <Image 
          source={{ uri: meal.image }} 
          style={styles.mealImage}
          resizeMode="cover"
        />
      )}

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Header con nombre y tiempo */}
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.mealName}>
            {meal.name}
          </ThemedText>
          {meal.time && (
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color="#6b7280" />
              <ThemedText style={styles.mealTime}>
                {meal.time}
              </ThemedText>
            </View>
          )}
        </View>

        {/* Lista de alimentos */}
        <View style={styles.foodsContainer}>
          {meal.foods.map((food, index) => (
            <View key={`${meal.id}-${index}`} style={styles.foodItem}>
              <View style={styles.foodBullet} />
              <ThemedText style={styles.foodName}>
                {food}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Detalles nutricionales */}
        {(meal.calories || meal.protein || meal.carbs || meal.fat) && (
          <View style={styles.nutritionContainer}>
            {meal.calories && (
              <View style={styles.nutritionItem}>
                <Ionicons name="flame-outline" size={16} color="#ef4444" />
                <ThemedText style={styles.nutritionText}>
                  {meal.calories} kcal
                </ThemedText>
              </View>
            )}
            
            <View style={styles.nutritionRow}>
              {meal.protein && (
                <View style={styles.nutritionItem}>
                  <Ionicons name="barbell-outline" size={16} color="#3b82f6" />
                  <ThemedText style={styles.nutritionText}>
                    {meal.protein}g
                  </ThemedText>
                </View>
              )}
              
              {meal.carbs && (
                <View style={styles.nutritionItem}>
                  <Ionicons name="nutrition-outline" size={16} color="#f59e0b" />
                  <ThemedText style={styles.nutritionText}>
                    {meal.carbs}g
                  </ThemedText>
                </View>
              )}
              
              {meal.fat && (
                <View style={styles.nutritionItem}>
                  <Ionicons name="fast-food-outline" size={16} color="#10b981" />
                  <ThemedText style={styles.nutritionText}>
                    {meal.fat}g
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Acciones (opcionales) */}
        {showActions && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity 
                onPress={onEdit} 
                style={[styles.actionButton, styles.editButton]}
              >
                <Ionicons name="pencil-outline" size={18} color="#ffffff" />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity 
                onPress={onDelete} 
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Ionicons name="trash-outline" size={18} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  mealImage: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealTime: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
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
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginRight: 12,
  },
  foodName: {
    fontSize: 15,
    color: '#374151',
  },
  nutritionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
    marginTop: 8,
  },
  nutritionRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  nutritionText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  editButton: {
    backgroundColor: '#3b82f6',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
});