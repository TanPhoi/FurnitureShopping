import {ic_edit} from '@/assets/icons';
import {colors} from '@/themes';
import React, {JSX} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type LabelProps = {
  label: string;
  isShowIcon: boolean;
  onPress?: () => void;
};

const Label = ({label, isShowIcon, onPress}: LabelProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtLabel}>{label}</Text>
      {isShowIcon && (
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.icon} source={ic_edit} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  txtLabel: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Label;
