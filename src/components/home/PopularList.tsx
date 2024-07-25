import {popularData} from '@/mock/popularData';
import {Popular} from '@/model/popular.model';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import React, {JSX} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const PopularList = (): JSX.Element => {
  const RenderItem = ({image, label}: Popular) => (
    <TouchableOpacity style={styles.boxItem}>
      <View style={styles.boxIcon}>
        <Image style={styles.icon} source={image} />
      </View>
      <Text style={styles.txtLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={popularData}
      renderItem={({item}) => <RenderItem {...item} />}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={screenWidth * 0.25 + 25}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  boxItem: {
    marginRight: spacing.xl,
    alignItems: 'center',
  },

  boxIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.disabled_field,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLabel: {
    marginTop: spacing.xs,
    fontFamily: 'NunitoSans',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    flexShrink: 0,
  },
});

export default PopularList;
