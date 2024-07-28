import {ic_star} from '@/assets/icons';
import {ButtonMain, Header} from '@/commons';
import {reviewProductData} from '@/mock/reviewProductData';
import {ReviewProductType} from '@/model/reviewProduct.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

type ReviewsProductProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'ReviewsProduct'>;
  route: RouteProp<RootStackParamsList, 'ReviewsProduct'>;
};
const ReviewsProduct = ({
  navigation,
  route,
}: ReviewsProductProps): JSX.Element => {
  const {product} = route.params;

  const handleBack = (): void => {
    navigation.goBack();
  };

  //TODO: implement later
  const handleWriteReview = (): void => {};

  const RenderItem = (reviewProduct: ReviewProductType) => (
    <View style={styles.itemContainer}>
      <Image style={styles.imgUser} source={reviewProduct.image} />
      <View style={styles.boxName}>
        <Text style={styles.txtName}>{reviewProduct.name}</Text>
        <Text style={styles.txtTime}>{reviewProduct.time}</Text>
      </View>
      <View style={styles.boxRateItem}>
        {Array.from({length: reviewProduct.rating}).map((_, index) => (
          <Image key={index} style={styles.icon} source={ic_star} />
        ))}
      </View>
      <Text style={styles.txtContent}>{reviewProduct.content}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <Header title={'Rating & Review'} onPress={handleBack} />

      <View style={styles.boxContainer}>
        <Image style={styles.imgProduct} source={product.image} />
        <View style={styles.boxContent}>
          <Text style={styles.txtNameProduct}>{product.label}</Text>
          <View style={styles.boxRate}>
            <Image style={styles.icon} source={ic_star} />
            <Text style={styles.txtRate}>{product.rate}</Text>
          </View>
          <Text style={styles.txtReview}>{product.review} reviews</Text>
        </View>
      </View>

      <FlatList
        data={reviewProductData}
        renderItem={({item}) => <RenderItem {...item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flat}
      />

      <View style={styles.button}>
        <ButtonMain title={'Write a review'} onPress={handleWriteReview} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  boxContainer: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.blur_grey,
    paddingHorizontal: spacing.lg,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.yellow,
  },
  imgProduct: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  txtNameProduct: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
  },
  boxContent: {
    rowGap: 10,
  },
  boxRate: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  txtRate: {
    color: colors.black_font,
    fontFamily: 'NunitoSans',
    fontSize: 24,
    fontWeight: '700',
  },
  txtReview: {
    color: colors.black_font,
    fontFamily: 'NunitoSans',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    borderRadius: 10,
    backgroundColor: 'red',
  },

  flat: {
    paddingHorizontal: spacing.lg,
  },
  itemContainer: {
    marginTop: spacing.xxl,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  imgUser: {
    position: 'absolute',
    top: -25,
    right: 148,
    left: 148,
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  boxName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtName: {
    color: colors.primary,
    fontWeight: '600',
    fontFamily: 'NunitoSans',
  },
  txtTime: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
  },
  boxRateItem: {
    marginTop: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  txtContent: {
    marginTop: spacing.md,
    color: colors.primary,
    fontFamily: 'NunitoSans',
    textAlign: 'justify',
  },

  button: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
});

export default ReviewsProduct;
