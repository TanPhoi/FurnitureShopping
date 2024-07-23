import {ic_bag} from '@/assets/icons';
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

type CategoryProduct = {
  id: number;
  image: ImageSourcePropType;
  label: string;
  price: number;
  rate: number;
  review: number;
  desc: string;
  quantity: number;
};

type CategoryProductListProps = {
  categoryProductsList: CategoryProduct[];
  onPress: (
    id: number,
    image: ImageSourcePropType,
    label: string,
    price: number,
    rate: number,
    review: number,
    desc: string,
    quantity: number,
  ) => void;
};

const CategoryProductList = ({
  categoryProductsList,
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
    quantity,
  }: CategoryProduct) => (
    <TouchableOpacity
      style={styles.boxItem}
      onPress={() =>
        onPress(id, image, label, price, rate, review, desc, quantity)
      }>
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
      data={categoryProductsList}
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

export default CategoryProductList;
