// app/(tabs)/PaymentCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

interface PaymentCardProps {
  label: string;
  icon: string;
  backText: string;
  selected: boolean;
  onSelect: () => void;
}

export default function PaymentCard({
  label,
  icon,
  backText,
  selected,
  onSelect,
}: PaymentCardProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withTiming(selected ? 180 : 0, { duration: 600 });
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${rotation.value}deg`,
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <Animated.View style={[styles.card, selected && styles.selected, animatedStyle]}>
        <FontAwesome5 name={icon} size={40} color={selected ? '#1e90ff' : '#555'} />
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        {selected && <Text style={styles.backText}>{backText}</Text>}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  selected: {
    borderWidth: 3,
    borderColor: '#1e90ff',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  labelSelected: {
    color: '#1e90ff',
  },
  backText: {
    marginTop: 15,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
