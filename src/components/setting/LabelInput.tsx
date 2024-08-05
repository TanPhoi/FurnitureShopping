import React, {JSX} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {colors, spacing} from '@/themes';

type LabelInputProps = {
  label: string;
  value: string;
  secureTextEntry: boolean;
  editable: boolean;
  onChangeText: (text: string) => void;
};

const LabelInput = ({
  label,
  value,
  secureTextEntry,
  editable,
  onChangeText,
}: LabelInputProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
  },
  label: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
  },
  input: {
    paddingVertical: spacing.xs,
    height: 30,
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default LabelInput;
