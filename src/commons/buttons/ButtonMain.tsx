import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ButtonMainProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
const ButtonMain = ({
  title,
  onPress,
  disabled,
}: ButtonMainProps): JSX.Element => {
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
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: spacing.xs},
    shadowOpacity: 0.2,
    shadowRadius: spacing.xs,
    elevation: 4,
  },
  txt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'NunitoSans',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ButtonMain;
