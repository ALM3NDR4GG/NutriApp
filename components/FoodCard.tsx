import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

type FoodCardProps = {
  food: {
    id: string;
    name: string;
    calories: number;
    image?: string;
  };
};

export default function FoodCard({ food }: FoodCardProps) {
  return (
    <ThemedView style={styles.card}>
      {food.image && (
        <Image source={{ uri: food.image }} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <ThemedText type="defaultSemiBold">{food.name}</ThemedText>
        <ThemedText style={styles.calories}>{food.calories} kcal</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  calories: {
    color: '#666',
    fontSize: 14,
  },
});