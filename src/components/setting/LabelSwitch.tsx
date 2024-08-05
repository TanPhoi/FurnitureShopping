import React, {JSX} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import {colors, spacing} from '@/themes';

type LabelSwitchProps = {
  label: string;
  isEnabled: boolean;
  onValueChange: (value: boolean) => void;
};

const LabelSwitch = ({
  label,
  isEnabled,
  onValueChange,
}: LabelSwitchProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{false: colors.gray_5, true: colors.success}}
        thumbColor={isEnabled ? colors.white : colors.white}
        ios_backgroundColor={colors.gray_5}
        onValueChange={onValueChange}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
  },
  label: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default LabelSwitch;
