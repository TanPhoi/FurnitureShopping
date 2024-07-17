import {ic_eye, ic_eye_hide} from '@/assets/icons';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

type TextWithInputProps = {
  label: string;
  isShowPassword: boolean;
  onChangeText: (text: string) => void;
  togglePasswordVisibility?: () => void;
};

const TextWithInput = ({
  label,
  isShowPassword,
  onChangeText,
  togglePasswordVisibility = () => {},
}: TextWithInputProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);

  const handleTogglePasswordVisibility = () => {
    togglePasswordVisibility();
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={
            label === 'Password' || label === 'Confirm Password'
              ? isVisible
              : false
          }
          onChangeText={onChangeText}
        />

        {label === 'Password' || label === 'Confirm Password' ? (
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
    marginBottom: 10,
    marginLeft: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
});

export default TextWithInput;
