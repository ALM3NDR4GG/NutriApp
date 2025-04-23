import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type TextType = 'title' | 'subtitle' | 'default' | 'defaultSemiBold';

type ThemedTextProps = TextProps & {
  type?: TextType;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedText({
  type = 'default',
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'light'
    ? lightColor || Colors.light.text
    : darkColor || Colors.dark.text;

  return (
    <Text
      style={[
        styles[type],
        { color },
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});