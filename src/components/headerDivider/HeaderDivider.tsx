import React, {JSX} from 'react';
import {Image, StyleSheet, View} from 'react-native';

const HeaderDivider = (): JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.divider}></View>
      <View>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/ic_sofa.png')}
        />
      </View>
      <View style={styles.divider}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 20,
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'center',
    borderWidth: 0.4,
    borderColor: 'black',
  },

  divider: {
    backgroundColor: 'black',
    height: 0.4,
    flex: 1,
  },
});

export default HeaderDivider;
