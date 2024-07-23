import {ic_back, ic_search, ic_shopping_cart} from '@/assets/icons';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import React, {JSX} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type TabBarMainProps = {
  title: string;
  onPress: () => void;
};

const TabBarMain = ({title, onPress}: TabBarMainProps): JSX.Element => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.icon} source={ic_back} />
      </TouchableOpacity>

      <Text style={styles.txtFavorites}>{title}</Text>

      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  icon: {
    width: 20,
    height: 20,
  },
  tbLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtFavorites: {
    fontSize: 16,
    color: colors.black_font,
    fontFamily: 'Merriweather',
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 20,
  },
});

export default TabBarMain;
