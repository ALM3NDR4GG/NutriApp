import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  ActivityIndicator,
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

// Imagen de placeholder genérica (puedes cambiar la URL)
const PLACEHOLDER_IMAGE = 'https://cdn.pixabay.com/photo/2016/12/06/18/27/cheese-1887233_640.jpg';

// Base de datos con imágenes verificadas
const FOOD_DATABASE = [
  // Frutas
  { id: 1, name: "Manzana", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, image: "https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_640.jpg", category: "Frutas" },
  { id: 2, name: "Plátano", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, image: "https://cdn.pixabay.com/photo/2017/06/27/22/21/banana-2449019_640.jpg", category: "Frutas" },
  { id: 3, name: "Fresa", calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, image: "https://cdn.pixabay.com/photo/2018/04/29/11/54/strawberries-3359755_640.jpg", category: "Frutas" },
  
  // Proteínas
  { id: 4, name: "Pollo", calories: 165, protein: 31, carbs: 0, fat: 3.6, image: "https://cdn.pixabay.com/photo/2017/06/30/20/23/chicken-2459679_640.jpg", category: "Proteínas" },
  { id: 5, name: "Salmón", calories: 208, protein: 20, carbs: 0, fat: 13, image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248_640.jpg", category: "Proteínas" },
  { id: 6, name: "Huevos", calories: 143, protein: 13, carbs: 0.7, fat: 9.5, image: "https://cdn.pixabay.com/photo/2018/08/29/19/03/egg-3640415_640.jpg", category: "Proteínas" },
  
  // Lácteos
  { id: 7, name: "Yogur", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, image: "https://cdn.pixabay.com/photo/2017/06/27/08/42/yogurt-2446893_640.jpg", category: "Lácteos" },
  { id: 8, name: "Queso", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, image: "https://cdn.pixabay.com/photo/2017/05/18/21/54/cheese-2325558_640.jpg", category: "Lácteos" },
  
  // Carbohidratos
  { id: 9, name: "Arroz", calories: 111, protein: 2.6, carbs: 23, fat: 0.9, image: "https://cdn.pixabay.com/photo/2014/04/05/11/39/rice-316347_640.jpg", category: "Carbohidratos" },
  { id: 10, name: "Avena", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, image: "https://cdn.pixabay.com/photo/2016/11/22/18/52/porridge-1850135_640.jpg", category: "Carbohidratos" },
  
  // Vegetales
  { id: 11, name: "Brócoli", calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4, image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/broccoli-1238250_640.jpg", category: "Vegetales" },
  { id: 12, name: "Zanahoria", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, image: "https://cdn.pixabay.com/photo/2018/08/31/19/13/carrots-3645375_640.jpg", category: "Vegetales" },
  
  // Snacks
  { id: 13, name: "Almendras", calories: 579, protein: 21, carbs: 22, fat: 50, image: "https://cdn.pixabay.com/photo/2016/12/06/01/26/almond-1885372_640.jpg", category: "Snacks" },
  { id: 14, name: "Nueces", calories: 654, protein: 15, carbs: 14, fat: 65, image: "https://cdn.pixabay.com/photo/2018/05/08/20/18/walnut-3383818_640.jpg", category: "Snacks" }
];

const CATEGORIES = [
  { id: 'fruits', name: 'Frutas', icon: '🍎' },
  { id: 'proteins', name: 'Proteínas', icon: '🍗' },
  { id: 'carbs', name: 'Carbohidratos', icon: '🍞' },
  { id: 'vegetables', name: 'Vegetales', icon: '🥦' },
  { id: 'dairy', name: 'Lácteos', icon: '🥛' },
  { id: 'snacks', name: 'Snacks', icon: '🥜' }
];

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      const timer = setTimeout(() => {
        const filtered = FOOD_DATABASE.filter(food => 
          food.name.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        setLoading(false);
      }, 300);
        
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const searchFood = (food: any) => {
    setResults([food]);
    setQuery('');
    setSuggestions([]);
  };

  const filterByCategory = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setResults([]);
    } else {
      setActiveCategory(categoryId);
      const categoryName = CATEGORIES.find(c => c.id === categoryId)?.name || '';
      const filtered = FOOD_DATABASE.filter(food => food.category === categoryName);
      setResults(filtered);
    }
  };

  // Función para manejar errores de carga de imágenes
  const handleImageError = (error: any, item: any) => {
    console.log(`Error loading image for ${item.name}:`, error);
    // Podrías implementar lógica adicional aquí si es necesario
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍏 NutriExplorer</Text>
        <Text style={styles.headerSubtitle}>Encuentra valores nutricionales</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar alimentos..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                setQuery('');
                setSuggestions([]);
              }}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Sugerencias con altura fija y scroll interno */}
        {loading && suggestions.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#4CAF50" />
          </View>
        ) : suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.suggestionItem}
                  onPress={() => searchFood(item)}
                >
                  <Image 
                    source={{ uri: item.image || PLACEHOLDER_IMAGE }} 
                    style={styles.suggestionImage}
                    onError={(e) => handleImageError(e, item)}
                  />
                  <View style={styles.suggestionTextContainer}>
                    <Text style={styles.suggestionText}>{item.name}</Text>
                    <Text style={styles.suggestionCalories}>{item.calories} kcal • {item.protein}g proteína</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="always"
              style={{ maxHeight: 200 }} // Altura fija para sugerencias
            />
          </View>
        )}
      </View>

      {/* Categorías con margen inferior */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton
            ]}
            onPress={() => filterByCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              activeCategory === category.id && styles.activeCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Contenido principal con SafeAreaView */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {results.length > 0 ? (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              {activeCategory 
                ? `${CATEGORIES.find(c => c.id === activeCategory)?.name} (${results.length})`
                : 'Resultado'}
            </Text>
            
            <View style={styles.foodGrid}>
              {results.map((item) => (
                <View key={item.id} style={styles.foodCard}>
                  <Image 
                    source={{ uri: item.image || PLACEHOLDER_IMAGE }} 
                    style={styles.foodImage}
                    onError={(e) => handleImageError(e, item)}
                  />
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionText}>{item.calories} kcal</Text>
                      <Text style={styles.nutritionText}>{item.protein}g P</Text>
                    </View>
                    <View style={styles.nutritionRow}>
                      <Text style={styles.nutritionText}>{item.carbs}g C</Text>
                      <Text style={styles.nutritionText}>{item.fat}g G</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.featuredContainer}>
            <Text style={styles.sectionTitle}>Alimentos Destacados</Text>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {FOOD_DATABASE.slice(0, 8).map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.featuredCard}
                  onPress={() => searchFood(item)}
                >
                  <Image 
                    source={{ uri: item.image || PLACEHOLDER_IMAGE }} 
                    style={styles.featuredImage}
                    onError={(e) => handleImageError(e, item)}
                  />
                  <Text style={styles.featuredName}>{item.name}</Text>
                  <Text style={styles.featuredCalories}>{item.calories} kcal</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    elevation: 3,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    zIndex: 100,
  },
  searchInputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 12,
    paddingLeft: 15,
    fontSize: 16,
    elevation: 2,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#e0e0e0',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 200,
    elevation: 3,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  suggestionCalories: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    elevation: 2,
  },
  activeCategoryButton: {
    backgroundColor: '#4CAF50',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  activeCategoryText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  resultsContainer: {
    paddingHorizontal: 15,
  },
  resultsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodCard: {
    width: width * 0.45, // 45% del ancho de pantalla
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: width * 0.35, // Relación de aspecto cuadrada
    resizeMode: 'cover',
  },
  foodInfo: {
    padding: 10,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  nutritionText: {
    fontSize: 11,
    color: '#555',
    fontWeight: '500',
  },
  featuredContainer: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  horizontalScrollContent: {
    paddingRight: 15,
  },
  featuredCard: {
    width: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
    padding: 8,
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
  },
  featuredName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 3,
  },
  featuredCalories: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
    textAlign: 'center',
  },
});