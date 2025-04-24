import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import MealPlanCard from '@/components/MealPlanCard';

const HomeScreen = () => {
  const dailyNutrition = {
    calories: 1850,
    protein: 120,
    carbs: 200,
    fat: 50,
    water: 2000 // ml
  };

  const todaysMeals = [
    { 
      id: '1', 
      name: 'Desayuno', 
      foods: ['Avena con frutas', 'Yogur griego', 'Nueces'],
      time: '08:00 AM',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500',
      calories: 450,
      protein: 18,
      carbs: 65,
      fat: 12
    },
    { 
      id: '2', 
      name: 'Almuerzo', 
      foods: ['Pechuga de pollo', 'Quinoa', 'Ensalada de espinacas'],
      time: '01:30 PM',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
      calories: 650,
      protein: 45,
      carbs: 50,
      fat: 20
    },
    { 
      id: '3', 
      name: 'Cena', 
      foods: ['Salmón al horno', 'Brócoli', 'Puré de camote'],
      time: '07:45 PM',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
      calories: 550,
      protein: 35,
      carbs: 40,
      fat: 25
    },
  ];

  const quickActions: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: '1', name: 'Agregar Comida', icon: 'restaurant-outline' },
    { id: '2', name: 'Registrar Agua', icon: 'water-outline' },
    { id: '3', name: 'Progreso', icon: 'trending-up-outline' },
    { id: '4', name: 'Recetas', icon: 'book-outline' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>NutriTrack</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Tu resumen nutricional diario</ThemedText>
        </View>

        {/* Resumen Nutricional */}
        <View style={styles.summaryCard}>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Ionicons name="flame-outline" size={24} color="#ef4444" />
              <ThemedText style={styles.nutritionValue}>{dailyNutrition.calories}</ThemedText>
              <ThemedText style={styles.nutritionLabel}>Calorías</ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <Ionicons name="barbell-outline" size={24} color="#3b82f6" />
              <ThemedText style={styles.nutritionValue}>{dailyNutrition.protein}g</ThemedText>
              <ThemedText style={styles.nutritionLabel}>Proteína</ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <Ionicons name="nutrition-outline" size={24} color="#f59e0b" />
              <ThemedText style={styles.nutritionValue}>{dailyNutrition.carbs}g</ThemedText>
              <ThemedText style={styles.nutritionLabel}>Carbohidratos</ThemedText>
            </View>
            <View style={styles.nutritionItem}>
              <Ionicons name="fast-food-outline" size={24} color="#10b981" />
              <ThemedText style={styles.nutritionValue}>{dailyNutrition.fat}g</ThemedText>
              <ThemedText style={styles.nutritionLabel}>Grasas</ThemedText>
            </View>
          </View>
          
          {/* Progreso de Agua */}
          <View style={styles.waterContainer}>
            <View style={styles.waterHeader}>
              <Ionicons name="water-outline" size={20} color="#3b82f6" />
              <ThemedText style={styles.waterText}>Hidratación diaria</ThemedText>
            </View>
            <ThemedText style={styles.waterAmount}>
              {dailyNutrition.water} ml de 2500 ml
            </ThemedText>
            <View style={styles.waterProgressBar}>
              <View style={[styles.waterProgress, { width: `${(dailyNutrition.water / 2500) * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* Acciones Rápidas */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Acciones Rápidas</ThemedText>
        <View style={styles.quickActionsContainer}>
          {quickActions.map(action => (
            <TouchableOpacity key={action.id} style={styles.quickAction}>
              <Ionicons name={action.icon} size={24} color="#3b82f6" />
              <ThemedText style={styles.quickActionText}>{action.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plan de Comidas */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Plan de Comidas</ThemedText>
        {todaysMeals.map(meal => (
          <MealPlanCard 
            key={meal.id} 
            meal={meal} 
            style={styles.mealCard}
          />
        ))}

        {/* Consejo del Día */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb-outline" size={20} color="#f59e0b" />
            <ThemedText style={styles.tipTitle}>Consejo del día</ThemedText>
          </View>
          <ThemedText style={styles.tipText}>
            Consume proteínas en cada comida para mantener la saciedad y preservar masa muscular. 
            Las fuentes magras como pollo, pescado y legumbres son excelentes opciones.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nutritionItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 4,
    color: '#1e293b',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  waterContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  waterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  waterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  waterAmount: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  waterProgressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  waterProgress: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  quickAction: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    marginTop: 8,
  },
  mealCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
});

export default HomeScreen;