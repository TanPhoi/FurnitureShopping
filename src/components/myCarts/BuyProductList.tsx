import {ic_add, ic_delete} from '@/assets/icons';
import {spacing} from '@/themes';
import {colors} from '@/themes/colors';
import React, {JSX} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type BuyProduct = {
  id: number;
  image: ImageSourcePropType;
  label: string;
  price: number;
  rate: number;
  review: number;
  desc: string;
  quantity: number;
};

type BuyProductListProps = {
  buyProductList: BuyProduct[];
  onPress: (
    id: number,
    image: ImageSourcePropType,
    label: string,
    price: number,
    rate: number,
    review: number,
    desc: string,
  ) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onDeleteItem: (id: number) => void;
};

const BuyProductList = ({
  buyProductList,
  onQuantityChange,
  onDeleteItem,
}: BuyProductListProps): JSX.Element => {
  const RenderItem = ({
    id,
    image,
    label,
    price,
    rate,
    review,
    desc,
    quantity,
  }: BuyProduct) => {
    const numSre = quantity <= 9 ? '0' : '';
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.boxLeft}>
          <Image style={styles.image} source={image} />

          <View style={styles.centerContainer}>
            <View>
              <Text style={styles.txtLabel}>{label}</Text>
              <Text style={styles.txtPrice}>{`$ ${price}.00`}</Text>
            </View>

            <View style={styles.moreLessContainer}>
              <TouchableOpacity
                style={styles.boxMoreLess}
                onPress={() => onQuantityChange(id, quantity + 1)}>
                <Image style={styles.iconMore} source={ic_add} />
              </TouchableOpacity>

              <Text style={styles.txtNumber}>
                {numSre}
                {quantity}
              </Text>

              <TouchableOpacity
                style={styles.boxMoreLess}
                onPress={() =>
                  onQuantityChange(id, quantity > 1 ? quantity - 1 : 1)
                }>
                <View style={styles.iconLess}></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => onDeleteItem(id)}>
          <Image style={styles.icon} source={ic_delete} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={buyProductList}
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

export default BuyProductList;
