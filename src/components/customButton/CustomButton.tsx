import {colors} from '@/themes/colors';
import React, {JSX} from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
const CustomButton = ({
  title,
  onPress,
  disabled,
}: CustomButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.button,
    paddingVertical: 14,
    borderRadius: 6,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  txt: {
    color: colors.textButton,
    fontSize: 16,
  },
});

export default CustomButton;
