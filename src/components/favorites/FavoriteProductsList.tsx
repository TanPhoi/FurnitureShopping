import {ic_bag, ic_delete} from '@/assets/icons';
import {Product} from '@/model/production.model';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import React, {JSX, memo} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type FavoriteProductsListProps = {
  favoriteProductsList: Product[];
  onPress: (product: Product) => void;
  onPressDelete: (id: number) => void;
};

const FavoriteProductsList = ({
  favoriteProductsList,
  onPress,
  onPressDelete,
}: FavoriteProductsListProps): JSX.Element => {
  const RenderItem = (product: Product) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(product)}>
      <View style={styles.boxLeft}>
        <Image style={styles.image} source={product.image} />

        <View>
          <Text style={styles.txtLabel}>{product.label}</Text>
          <Text style={styles.txtPrice}>{`$ ${product.price}.00`}</Text>
        </View>
      </View>

      <View style={styles.boxRight}>
        <TouchableOpacity onPress={() => onPressDelete(product.id)}>
          <Image style={styles.icon} source={ic_delete} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image style={styles.icon} source={ic_bag} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={favoriteProductsList}
      renderItem={({item}) => <RenderItem {...item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatStyle}
    />
  );
};

const styles = StyleSheet.create({
  flatStyle: {
    paddingHorizontal: spacing.lg,
    rowGap: spacing.lg,
  },
  row: {
    columnGap: spacing.lg,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.blur_grey,
    paddingBottom: 12,
  },
  boxLeft: {
    flexDirection: 'row',
    columnGap: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: spacing.sm,
  },
  txtLabel: {
    color: colors.black_3,
    fontFamily: 'NunitoSans',
    fontWeight: '600',
  },
  txtPrice: {
    color: colors.black_font,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '700',
  },

  boxRight: {
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default memo(FavoriteProductsList);
