import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../app/(tabs)/index';
import FoodSearch from '../app/(tabs)/explore';
import MealPlanner from '../screens/MealPlanner';
import ProfileScreen from '../screens/ProfileScreen';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FoodSearch') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'MealPlanner') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Icono con efecto personalizado
          return (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Ionicons 
                name={iconName} 
                size={focused ? 26 : 24} 
                color={focused ? '#4CAF50' : '#757575'} 
              />
              {focused && <View style={styles.activeDot} />}
            </View>
          );
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Inicio',
          headerShown: false // Ocultar header solo en Home
        }} 
      />
      <Tab.Screen 
        name="FoodSearch" 
        component={FoodSearch} 
        options={{ 
          title: 'Buscar Alimentos',
          headerShown: false // Ocultar header si es necesario
        }} 
      />
      <Tab.Screen 
        name="MealPlanner" 
        component={MealPlanner} 
        options={{ 
          title: 'Plan de Comidas',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: 'Mi Perfil',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.stackHeader,
        headerTitleStyle: styles.stackHeaderTitle,
        headerBackTitleVisible: false,
        headerTintColor: '#4CAF50',
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 70,
    borderTopWidth: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
  },
  tabBarItem: {
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  activeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#4CAF50',
    marginTop: 4,
  },
  header: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  stackHeader: {
    backgroundColor: 'white',
    elevation: 0,
  },
  stackHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
});