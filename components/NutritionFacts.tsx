import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type NutritionData = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type NutritionFactsProps = {
  nutrition: NutritionData;
};

export default function NutritionFacts({ nutrition }: NutritionFactsProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Calorías:</ThemedText>
        <ThemedText style={styles.value}>{nutrition.calories} kcal</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Proteínas:</ThemedText>
        <ThemedText style={styles.value}>{nutrition.protein}g</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Carbohidratos:</ThemedText>
        <ThemedText style={styles.value}>{nutrition.carbs}g</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Grasas:</ThemedText>
        <ThemedText style={styles.value}>{nutrition.fat}g</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    color: '#4CAF50',
  },
});