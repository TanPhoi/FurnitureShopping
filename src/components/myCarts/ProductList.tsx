import {ic_add, ic_delete} from '@/assets/icons';
import {Product} from '@/model/production.model';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import {functionFormat} from '@/utils';
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
  productList: Product[];
  onQuantityChange: (id: number, newQuantity: number) => void;
  onDeleteProduct: (id: number) => void;
};

const ProductList = ({
  productList,
  onQuantityChange,
  onDeleteProduct,
}: ProductListProps): JSX.Element => {
  const RenderItem = (product: Product) => {
    const numStr = functionFormat(product.quantity);
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.boxLeft}>
          <Image style={styles.image} source={product.image} />

          <View style={styles.centerContainer}>
            <View>
              <Text style={styles.txtLabel}>{product.label}</Text>
              <Text style={styles.txtPrice}>
                {`$ ${product.price.toFixed(2)}`}
              </Text>
            </View>

            <View style={styles.moreLessContainer}>
              <TouchableOpacity
                style={styles.boxMoreLess}
                onPress={(): void =>
                  onQuantityChange(product.id, product.quantity + 1)
                }>
                <Image style={styles.iconMore} source={ic_add} />
              </TouchableOpacity>

              <Text style={styles.txtNumber}>
                {numStr}
                {product.quantity}
              </Text>

              <TouchableOpacity
                style={styles.boxMoreLess}
                onPress={(): void =>
                  onQuantityChange(
                    product.id,
                    product.quantity > 1 ? product.quantity - 1 : 1,
                  )
                }>
                <View style={styles.iconLess}></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={(): void => onDeleteProduct(product.id)}>
          <Image style={styles.icon} source={ic_delete} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={productList}
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
  centerContainer: {
    justifyContent: 'space-between',
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

  icon: {
    width: 24,
    height: 24,
  },
  boxMoreLess: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: colors.gray_5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreLessContainer: {
    flexDirection: 'row',
    columnGap: 15,
    alignItems: 'center',
  },
  iconMore: {
    width: 14,
    height: 14,
  },
  txtNumber: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.9,
  },
  iconLess: {
    width: 14,
    height: 2,
    backgroundColor: colors.primary,
  },
});

export default memo(ProductList);
