import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

interface NutritionProgressBarProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  progress: number;
  color: string;
}

export default function NutritionProgressBar({
  label,
  current,
  goal,
  unit,
  progress,
  color
}: NutritionProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <ThemedText style={styles.value}>
          {current.toFixed(0)}/{goal.toFixed(0)}{unit}
        </ThemedText>
      </View>
      
      <View style={styles.progressBarBackground}>
        <View 
          style={[
            styles.progressBarFill,
            { 
              width: `${progress}%`,
              backgroundColor: color
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});