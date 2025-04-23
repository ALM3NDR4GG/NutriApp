// screens/ProfileScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { NutritionInfo } from '@/services/nutritionService';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  // Datos de ejemplo del usuario
  const user = {
    name: 'Ana García',
    email: 'ana@example.com',
    age: 28,
    weight: 65, // kg
    height: 170, // cm
    goal: 'Mantener peso',
  };

  // Estadísticas semanales de ejemplo
  const weeklyStats: NutritionInfo = {
    calories: 12500,
    protein: 560,
    carbs: 1200,
    fat: 350,
  };

  // Metas diarias
  const dailyGoals: NutritionInfo = {
    calories: 1800,
    protein: 90,
    carbs: 200,
    fat: 50,
  };

  return (
    <ThemedView style={styles.container}>
      {/* Sección de perfil */}
      <View style={styles.profileSection}>
        <Ionicons 
          name="person-circle" 
          size={100} 
          color="#4CAF50" 
          style={styles.avatarIcon} 
        />
        <ThemedText type="title" style={styles.userName}>{user.name}</ThemedText>
        <ThemedText style={styles.userInfo}>{user.email}</ThemedText>
        <ThemedText style={styles.userInfo}>
          {user.age} años • {user.height} cm • {user.weight} kg
        </ThemedText>
        <ThemedText style={styles.goalText}>Objetivo: {user.goal}</ThemedText>
      </View>

      {/* Estadísticas semanales */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Estadísticas Semanales
        </ThemedText>
        <View style={styles.statsContainer}>
          <StatItem value={weeklyStats.calories} label="Calorías" unit="kcal" />
          <StatItem value={weeklyStats.protein} label="Proteína" unit="g" />
          <StatItem value={weeklyStats.carbs} label="Carbohidratos" unit="g" />
          <StatItem value={weeklyStats.fat} label="Grasas" unit="g" />
        </View>
      </ThemedView>

      {/* Metas diarias */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Tus Metas Diarias
        </ThemedText>
        <View style={styles.statsContainer}>
          <StatItem value={dailyGoals.calories} label="Calorías" unit="kcal" />
          <StatItem value={dailyGoals.protein} label="Proteína" unit="g" />
          <StatItem value={dailyGoals.carbs} label="Carbos" unit="g" />
          <StatItem value={dailyGoals.fat} label="Grasas" unit="g" />
        </View>
      </ThemedView>
    </ThemedView>
  );
};

// Componente para mostrar cada estadística
const StatItem = ({ value, label, unit }: { value: number; label: string; unit: string }) => (
  <View style={styles.statItem}>
    <ThemedText type="defaultSemiBold" style={styles.statValue}>
      {value.toLocaleString()}
      <ThemedText style={styles.statUnit}> {unit}</ThemedText>
    </ThemedText>
    <ThemedText style={styles.statLabel}>{label}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 0.4,
    justifyContent: 'center',
  },
  avatarIcon: {
    marginBottom: 15,
  },
  userName: {
    marginBottom: 5,
    fontSize: 22,
  },
  userInfo: {
    marginBottom: 3,
    color: '#666',
    fontSize: 14,
  },
  goalText: {
    marginTop: 10,
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flex: 0.3,
  },
  sectionTitle: {
    marginBottom: 15,
    color: '#4CAF50',
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  statValue: {
    fontSize: 16,
    color: '#4CAF50',
  },
  statUnit: {
    fontSize: 12,
    color: '#666',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default ProfileScreen;