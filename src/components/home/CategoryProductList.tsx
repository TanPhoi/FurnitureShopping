import {ic_bag, ic_bagTwo} from '@/assets/icons';
import {
  img_black_simple_lamp,
  img_coffee_chair,
  img_coffee_table,
  img_minimal_stand,
  img_simple_desk,
} from '@/assets/images';
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

const categoryProductData = [
  {
    id: 1,
    image: img_black_simple_lamp,
    label: 'Black Simple Lamp',
    price: 12.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
  },
  {
    id: 2,
    image: img_minimal_stand,
    label: 'Minimal Stand',
    price: 25.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
  },
  {
    id: 3,
    image: img_coffee_chair,
    label: 'Coffee Chair',
    price: 20.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
  },
  {
    id: 4,
    image: img_simple_desk,
    label: 'Simple Desk',
    price: 50.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
  },
  {
    id: 5,
    image: img_coffee_table,
    label: 'Coffee Table',
    price: 50.0,
    rate: 4.5,
    review: 50,
    desc:
      'Minimal Stand is made of by natural wood.' +
      'The design that is very simple and minimal.' +
      'This is truly one of the best furnitures in any family for now.' +
      'With 3 different colors, you can easily select the best match for your home.',
  },
];

type CategoryProduct = {
  id: number;
  image: ImageSourcePropType;
  label: string;
  price: number;
  rate: number;
  review: number;
  desc: string;
};

type CategoryProductListProps = {
  onPress: (
    id: number,
    image: ImageSourcePropType,
    label: string,
    price: number,
    rate: number,
    review: number,
    desc: string,
  ) => void;
};

const CategoryProductList = ({
  onPress,
}: CategoryProductListProps): JSX.Element => {
  const RenderItem = ({
    id,
    image,
    label,
    price,
    rate,
    review,
    desc,
  }: CategoryProduct) => (
    <TouchableOpacity
      style={styles.boxItem}
      onPress={() => onPress(id, image, label, price, rate, review, desc)}>
      <View>
        <Image style={styles.image} source={image} />
        <Image style={styles.icon} source={ic_bag} />
      </View>
      <Text style={styles.txtLabel}>{label}</Text>
      <Text style={styles.txtPrice}>{`$ ${price}.00`}</Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={categoryProductData}
      renderItem={({item}) => <RenderItem {...item} />}
      showsHorizontalScrollIndicator={false}
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

export default CategoryProductList;
