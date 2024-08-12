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
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
};

const InputField = ({
  label,
  placeholder,
  value,
  keyboardType,
  onChangeText,
}: InputFieldProps): JSX.Element => {
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

  return (
    <View style={focusedInput ? styles.boxInputFocus : styles.boxInput}>
      <Text style={styles.txtLabel}>{label}</Text>
      <TextInput
        style={styles.txtInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocusedInput(true)}
        onBlur={() => setFocusedInput(false)}
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
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  txtLabel: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
  },
  txtInput: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
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
