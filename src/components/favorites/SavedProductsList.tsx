import {ic_bag, ic_bagTwo, ic_delete, ic_exit} from '@/assets/icons';
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

type SavedProduct = {
  id: number;
  image: ImageSourcePropType;
  label: string;
  price: number;
  rate: number;
  review: number;
  desc: string;
  quantity: number;
};

type SavedProductsListProps = {
  savedProductsList: SavedProduct[];
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
  onPressDelete: (id: number) => void;
};

const SavedProductsList = ({
  savedProductsList,
  onPress,
  onPressDelete,
}: SavedProductsListProps): JSX.Element => {
  const RenderItem = ({
    id,
    image,
    label,
    price,
    rate,
    review,
    desc,
    quantity,
  }: SavedProduct) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        onPress(id, image, label, price, rate, review, desc, quantity)
      }>
      <View style={styles.boxLeft}>
        <Image style={styles.image} source={image} />

        <View>
          <Text style={styles.txtLabel}>{label}</Text>
          <Text style={styles.txtPrice}>{`$ ${price}.00`}</Text>
        </View>
      </View>

      <View style={styles.boxRight}>
        <TouchableOpacity onPress={() => onPressDelete(id)}>
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
      data={savedProductsList}
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

export default SavedProductsList;
