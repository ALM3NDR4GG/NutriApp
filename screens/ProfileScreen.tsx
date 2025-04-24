import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import NutritionProgressCircle from '../components/NutritionProgressCircle';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const [user, setUser] = useState({
    name: 'Alexis Priego',
    email: 'alexis@example.com',
    age: '22',
    weight: '78', // kg
    height: '173', // cm
    goal: 'Mantener peso',
    activityLevel: 'Moderadamente activa'
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<keyof typeof user | null>(null);
  const [editValue, setEditValue] = useState('');

  const weeklyStats = {
    calories: 12500,
    protein: 560,
    carbs: 1200,
    fat: 350,
    water: 14, // litros
    workouts: 5
  };

  const dailyGoals = {
    calories: 1800,
    protein: 90,
    carbs: 200,
    fat: 50,
    water: 2 // litros
  };

  const weeklyProgress = [
    { day: 'L', calories: 1800, completed: true },
    { day: 'M', calories: 1750, completed: true },
    { day: 'Mi', calories: 1900, completed: true },
    { day: 'J', calories: 1650, completed: true },
    { day: 'V', calories: 1820, completed: true },
    { day: 'S', calories: 2100, completed: false },
    { day: 'D', calories: 0, completed: false },
  ];

  const handleEdit = (field: keyof typeof user) => {
    setEditingField(field);
    setEditValue(user[field]);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (editingField) {
      setUser({ ...user, [editingField]: editValue });
    }
    setEditModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header con gradiente y foto */}
      <LinearGradient
        colors={['#4CAF50', '#81C784']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.avatarContainer}>
          <Ionicons 
            name="person-circle" 
            size={100} 
            color="rgba(255,255,255,0.9)" 
          />
          <TouchableOpacity style={styles.editPhotoButton}>
            <Ionicons name="camera" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Información del usuario */}
      <View style={styles.profileSection}>
        <View style={styles.userInfoRow}>
          <ThemedText type="title" style={styles.userName}>{user.name}</ThemedText>
          <TouchableOpacity 
            onPress={() => handleEdit('name')}
            style={styles.editButton}
          >
            <Ionicons name="create-outline" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        
        <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
        
        <View style={styles.infoGrid}>
          <InfoCard 
            icon="calendar" 
            label="Edad" 
            value={`${user.age} años`} 
            onPress={() => handleEdit('age')}
          />
          <InfoCard 
            icon="body" 
            label="Altura" 
            value={`${user.height} cm`} 
            onPress={() => handleEdit('height')}
          />
          <InfoCard 
            icon="scale" 
            label="Peso" 
            value={`${user.weight} kg`} 
            onPress={() => handleEdit('weight')}
          />
          <InfoCard 
            icon="barbell" 
            label="Actividad" 
            value={user.activityLevel} 
            onPress={() => handleEdit('activityLevel')}
          />
        </View>
        
        <GoalCard 
          goal={user.goal}
          onPress={() => handleEdit('goal')}
        />
      </View>

      {/* Progreso semanal */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Progreso Semanal
          </ThemedText>
          <Ionicons name="stats-chart" size={20} color="#4CAF50" />
        </View>
        
        <View style={styles.weekProgress}>
          {weeklyProgress.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <ThemedText style={styles.dayLabel}>{day.day}</ThemedText>
              <View style={[
                styles.dayProgress, 
                day.completed && styles.dayCompleted,
                !day.calories && styles.dayEmpty
              ]}>
                {day.calories > 0 && (
                  <ThemedText style={styles.dayCalories}>
                    {day.calories}
                  </ThemedText>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Estadísticas */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Tus Estadísticas
          </ThemedText>
          <Ionicons name="analytics" size={20} color="#4CAF50" />
        </View>
        
        <View style={styles.statsGrid}>
          <StatCard 
            icon="flame" 
            value={weeklyStats.calories.toLocaleString()} 
            label="Calorías" 
            unit="kcal" 
            color="#EF5350"
          />
          <StatCard 
            icon="barbell" 
            value={weeklyStats.workouts.toString()} 
            label="Entrenos" 
            color="#5C6BC0"
          />
          <StatCard 
            icon="water" 
            value={weeklyStats.water.toString()} 
            label="Agua" 
            unit="L" 
            color="#26C6DA"
          />
        </View>
      </View>

      {/* Metas nutricionales */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Metas Nutricionales
          </ThemedText>
          <Ionicons name="nutrition" size={20} color="#4CAF50" />
        </View>
        
        <View style={styles.nutritionGoals}>
          <NutritionProgressCircle
            current={dailyGoals.calories * 0.85}
            goal={dailyGoals.calories}
            label="Calorías"
            color="#4CAF50"
          />
          <NutritionProgressCircle
            current={dailyGoals.protein * 0.9}
            goal={dailyGoals.protein}
            label="Proteína"
            color="#2196F3"
          />
          <NutritionProgressCircle
            current={dailyGoals.water * 1.5}
            goal={dailyGoals.water}
            label="Agua"
            color="#00BCD4"
          />
        </View>
      </View>

      {/* Modal de edición */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              Editar {editingField}
            </ThemedText>
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={saveEdit}
              >
                <ThemedText style={styles.saveButtonText}>Guardar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Componentes auxiliares
const InfoCard = ({ icon, label, value, onPress }: { icon: keyof typeof Ionicons.glyphMap, label: string; value: string; onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.infoCard}>
    <View style={styles.infoIconContainer}>
      <Ionicons name={icon} size={20} color="#4CAF50" />
    </View>
    <View style={styles.infoTextContainer}>
      <ThemedText style={styles.infoLabel}>{label}</ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.infoValue}>{value}</ThemedText>
    </View>
    {onPress && <Ionicons name="chevron-forward" size={16} color="#BDBDBD" />}
  </TouchableOpacity>
);

const GoalCard = ({ goal, onPress }: { goal: string; onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.goalCard}>
    <View style={styles.goalIconContainer}>
      <Ionicons name="trophy" size={24} color="#FFC107" />
    </View>
    <ThemedText style={styles.goalText}>Objetivo: {goal}</ThemedText>
    {onPress && (
      <View style={styles.editGoalButton}>
        <Ionicons name="create-outline" size={18} color="#4CAF50" />
      </View>
    )}
  </TouchableOpacity>
);

const StatCard = ({ icon, value, label, unit, color }: { icon: keyof typeof Ionicons.glyphMap, value: string; label: string; unit?: string; color: string }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <ThemedText type="title" style={[styles.statValue, { color }]}>{value}{unit && ` ${unit}`}</ThemedText>
    <ThemedText style={styles.statLabel}>{label}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: -50,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#2C3E50',
  },
  editButton: {
    padding: 5,
  },
  userEmail: {
    fontSize: 15,
    color: '#7F8C8D',
    marginBottom: 25,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoIconContainer: {
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
  },
  goalCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  goalIconContainer: {
    marginRight: 12,
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  editGoalButton: {
    padding: 5,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  weekProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 8,
    fontWeight: '500',
  },
  dayProgress: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECF0F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCompleted: {
    backgroundColor: '#E8F5E9',
  },
  dayEmpty: {
    backgroundColor: '#ECF0F1',
  },
  dayCalories: {
    fontSize: 11,
    color: '#2C3E50',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '30%',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    textAlign: 'center',
    fontWeight: '500',
  },
  nutritionGoals: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    borderRadius: 18,
    padding: 24,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#2C3E50',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ECF0F1',
    borderRadius: 12,
    padding: 14,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#7F8C8D',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 14,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ProfileScreen;