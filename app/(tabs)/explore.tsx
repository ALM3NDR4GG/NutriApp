import { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import FoodCard from '@/components/FoodCard';
import { searchFood } from '@/services/nutritionService';

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      const foodResults = await searchFood(text);
      setResults(foodResults as any[]);
    } else {
      setResults([]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar alimentos..."
        value={query}
        onChangeText={handleSearch}
      />
      
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FoodCard food={item} />}
        />
      ) : (
        <ThemedText style={styles.noResults}>
          {query.length > 2 ? 'No se encontraron resultados' : 'Escribe al menos 3 caracteres para buscar'}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});