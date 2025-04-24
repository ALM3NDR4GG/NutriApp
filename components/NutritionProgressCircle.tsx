// components/NutritionProgressCircle.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ThemedText } from './ThemedText';
import { Circle, G, Svg } from 'react-native-svg';

interface NutritionProgressCircleProps {
  current: number;
  goal: number;
  label: string;
  color: string;
}

export default function NutritionProgressCircle({ 
  current, 
  goal, 
  label, 
  color 
}: NutritionProgressCircleProps) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(current / goal, 1);
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <View style={styles.container}>
      <Svg height="80" width="80" viewBox="0 0 80 80">
        <G rotation="-90" origin="40, 40">
          <Circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#f0f0f0"
            strokeWidth="6"
            fill="transparent"
          />
          <Circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.textContainer}>
        <ThemedText style={styles.percentage}>
          {Math.round(progress * 100)}%
        </ThemedText>
        <ThemedText style={styles.label}>{label}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  percentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
});