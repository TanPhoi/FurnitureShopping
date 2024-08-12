import React, {JSX, memo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import {colors, spacing} from '@/themes';

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
};

const InputField = ({
  label,
  placeholder,
  value,
  keyboardType,
  maxLength,
  onChangeText,
}: InputFieldProps): JSX.Element => {
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

  return (
    <View style={focusedInput ? styles.boxInputFocus : styles.boxInput}>
      <Text style={styles.txtLabel}>{label}</Text>
      <TextInput
        style={styles.edtInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocusedInput(true)}
        onBlur={() => setFocusedInput(false)}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    marginTop: spacing.lg,
    borderRadius: 4,
    backgroundColor: colors.disabled_field,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  txtLabel: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
  },
  edtInput: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    height: 30,
    paddingVertical: spacing.xs,
    fontWeight: '800',
  },
  boxInputFocus: {
    marginTop: spacing.lg,
    borderRadius: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 0.4,
    borderColor: colors.primary,
  },
});

export default memo(InputField);
