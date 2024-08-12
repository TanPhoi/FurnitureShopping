import {ic_add, ic_checkbox, ic_mastercard, ic_visa} from '@/assets/icons';
import {img_wave} from '@/assets/images';
import {Header} from '@/commons';
import {ADD_DATA_ERROR} from '@/constants/message.constant';
import {PaymentType} from '@/model/paymentType.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {
  formatCardNumber,
  getDataLocalStorage,
  setDataLocalStorage,
} from '@/utils';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type PaymentMethodProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'PaymentMethod'>;
};

const PaymentMethod = ({navigation}: PaymentMethodProps): JSX.Element => {
  const [paymentList, setPaymentList] = useState<PaymentType[] | null>(null);
  const [paymentId, setPaymentId] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const getPayments = (): void => {
        getDataLocalStorage<PaymentType[]>('payments').then(payments => {
          setPaymentList(payments || []);
        });
      };
      getPayments();
    }, []),
  );

  useEffect(() => {
    const getPaymentID = (): void => {
      getDataLocalStorage<number>('paymentID').then(paymentID => {
        setPaymentId(paymentID || 0);
      });
    };
    getPaymentID();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddPaymentMethod = (): void => {
    navigation.navigate('AddPaymentMethod');
  };

  const handleCheckbox = (id: number): void => {
    setDataLocalStorage('paymentID', id)
      .then(() => {
        setPaymentId(id);
      })
      .catch(err => {
        console.log(ADD_DATA_ERROR, err);
      });
  };

  const RenderItem = ({item}: {item: PaymentType}) => (
    <View style={item.id !== paymentId && styles.boxPayment}>
      <View style={styles.paymentContainer}>
        <Image style={styles.wave} source={img_wave} />
        <View style={styles.boxTop}>
          {item.type === 'visa' ? (
            <Image style={styles.iconVisa} source={ic_visa} />
          ) : (
            <Image style={styles.iconMastercard} source={ic_mastercard} />
          )}
        </View>

        <Text style={styles.cardNumber}>
          {formatCardNumber(item.cardNumber)}
        </Text>

        <View style={styles.boxBottom}>
          <View>
            <Text style={styles.txtLabel}>Card Holder Name</Text>
            <Text style={styles.txtX}>{item.cardHolderName}</Text>
          </View>
          <View>
            <Text style={styles.txtLabel}>Expiry Date</Text>
            <Text style={styles.txtX}>{item.expiryDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => handleCheckbox(item.id)}
          style={[
            styles.checkbox,
            item.id === paymentId && styles.checkedCheckbox,
          ]}>
          {item.id === paymentId && (
            <Image style={styles.checkmark} source={ic_checkbox} />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Use as default payment method</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <Header title={'Payment Method'} onPress={handleBack} />

      <View style={{flex: 1, marginTop: 40}}>
        <FlatList
          data={paymentList}
          renderItem={RenderItem}
          contentContainerStyle={styles.flatStyle}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.boxAdd}
          onPress={handleAddPaymentMethod}>
          <Image style={styles.icon} source={ic_add} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  flatStyle: {
    paddingHorizontal: spacing.lg,
    rowGap: 30,
  },
  boxAdd: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: colors.secondary,
    borderRadius: 50,
    padding: spacing.md,
    bottom: 50,
    right: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  boxPayment: {
    opacity: 0.5,
  },
  paymentContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  wave: {
    width: 280,
    height: 95,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  boxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  iconMastercard: {
    width: 30,
    height: 24,
    resizeMode: 'contain',
  },
  iconVisa: {
    width: 50,
    height: 16,
    resizeMode: 'contain',
  },
  boxBottom: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNumber: {
    marginTop: spacing.lg,
    color: colors.white,
    fontFamily: 'Nunito Sans',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 4,
  },

  txtLabel: {
    color: colors.white,
    fontFamily: 'Nunito Sans',
    fontSize: 12,
    fontWeight: '600',
  },
  txtX: {
    marginTop: spacing.xs,
    color: colors.white,
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.4,
  },

  checkboxContainer: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.text_secondary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: colors.primary,
  },
  checkmark: {
    width: 12,
    height: 12,
  },
  checkboxLabel: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: 'NunitoSans',
  },
});

export default PaymentMethod;
