import {ic_eye, ic_eye_hide} from '@/assets/icons';
import {colors, spacing} from '@/themes';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

type TextInputMainProps = {
  label: string;
  isShowPassword: boolean;
  onChangeText: (text: string) => void;
  togglePasswordVisibility?: () => void;
};

const TextInputMain = ({
  label,
  isShowPassword,
  onChangeText,
  togglePasswordVisibility = () => {},
}: TextInputMainProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const isPasswordOrConfirmPassword =
    label === 'Password' || label === 'Confirm Password';

  const handleTogglePasswordVisibility = (): void => {
    togglePasswordVisibility();
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isPasswordOrConfirmPassword ? isVisible : false}
          onChangeText={onChangeText}
        />

        {isPasswordOrConfirmPassword ? (
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            style={styles.eyeIcon}>
            {isShowPassword && (
              <Image
                style={styles.icon}
                source={isVisible ? ic_eye : ic_eye_hide}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    marginLeft: spacing.lg,
  },
  label: {
    fontSize: 14,
    marginBottom: spacing.xxs,
    color: colors.grey_2,
    fontFamily: 'NunitoSans',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.gray_5,
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
  },
  eyeIcon: {
    padding: spacing.sm,
  },
  icon: {
    width: spacing.md,
    height: spacing.md,
    marginRight: spacing.lg,
  },
});

export default TextInputMain;
