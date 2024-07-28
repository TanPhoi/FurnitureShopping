import {ic_back, ic_search, ic_star} from '@/assets/icons';
import {myReviewsData} from '@/mock/myReviewsData';
import {MyReviewsType} from '@/model/myReviewsType.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type MyReviewsProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MyReviews'>;
};

const MyReviews = ({navigation}: MyReviewsProps): JSX.Element => {
  const handleBack = (): void => {
    navigation.goBack();
  };

  const RenderItem = (myReview: MyReviewsType) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.boxInformationProduct}>
        <Image style={styles.imgProduct} source={myReview.image} />
        <View>
          <Text style={styles.txtName}>{myReview.name}</Text>
          <Text style={styles.txtPrice}>$ {myReview.price.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.rateContainer}>
        <View style={styles.boxRateItem}>
          {Array.from({length: myReview.rating}).map((_, index) => (
            <Image key={index} style={styles.iconStar} source={ic_star} />
          ))}
        </View>
        <Text style={styles.txtTime}>{myReview.time}</Text>
      </View>
      <Text style={styles.txtContent}>{myReview.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Image style={styles.icon} source={ic_back} />
        </TouchableOpacity>
        <Text style={styles.txtNotification}>My reviews</Text>
        <TouchableOpacity>
          <Image style={styles.icon} source={ic_search} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={myReviewsData}
        renderItem={({item}) => <RenderItem {...item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    columnGap: 24,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  txtNotification: {
    flex: 1,
    textAlign: 'center',
    color: colors.black_font,
    fontFamily: 'Merriweather',
    fontSize: 16,
    fontWeight: '700',
  },

  flatStyle: {
    marginTop: spacing.md,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: 8,
    elevation: 1,
  },
  boxInformationProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  imgProduct: {
    width: 70,
    height: 70,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  txtName: {
    color: colors.black_3,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
  txtPrice: {
    marginTop: spacing.xs,
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '800',
  },
  rateContainer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxRateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  iconStar: {
    width: 16,
    height: 16,
    tintColor: colors.yellow,
  },
  txtTime: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
  },
  txtContent: {
    marginTop: spacing.md,
    color: colors.primary,
    fontFamily: 'NunitoSans',
    textAlign: 'justify',
  },
});
export default MyReviews;
