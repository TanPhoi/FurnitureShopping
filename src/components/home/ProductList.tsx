import {ic_bag} from '@/assets/icons';
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

type ProductListProps = {
  productsList: Product[];
  onPress: (product: Product) => void;
};

const ProductList = ({
  productsList,
  onPress,
}: ProductListProps): JSX.Element => {
  const RenderItem = (product: Product) => (
    <TouchableOpacity style={styles.boxItem} onPress={() => onPress(product)}>
      <View>
        <Image style={styles.image} source={product.image} />
        <Image style={styles.icon} source={ic_bag} />
      </View>
      <Text style={styles.txtLabel}>{product.label}</Text>
      <Text style={styles.txtPrice}>{`$ ${product.price.toFixed(2)}`}</Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={productsList}
      renderItem={({item}) => <RenderItem {...item} />}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={styles.flatStyle}
      columnWrapperStyle={styles.row}
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
  boxItem: {
    flex: 1,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: spacing.sm,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  txtLabel: {
    marginTop: spacing.sm,
    color: colors.black_3,
    fontFamily: 'NunitoSans',
  },
  txtPrice: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.black_font,
    fontWeight: '700',
    fontFamily: 'NunitoSans',
  },
});

export default memo(ProductList);
