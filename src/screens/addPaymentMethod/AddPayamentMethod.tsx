import React, {JSX, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ic_mastercard, ic_visa} from '@/assets/icons';
import {ButtonMain, Header} from '@/commons';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {img_wave} from '@/assets/images';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';
import {PaymentType} from '@/model/paymentType.model';
import {
  formatCardNumber,
  formatExpirationDate,
} from '@/constants/regexs.constant';
import {FIELDS_REQUIRED} from '@/constants/message.constant';
import InputField from '@/commons/textInputs/InputField';

type AddPaymentMethodProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamsList,
    'AddPaymentMethod'
  >;
};

const AddPaymentMethod = ({navigation}: AddPaymentMethodProps): JSX.Element => {
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  const handleBack = (): void => {
    navigation.goBack();
  };

  const handleAddNewCard = (): void => {
    if (
      !cardHolderName ||
      !cardNumber ||
      !cvv ||
      !expirationDate ||
      cardNumber.length < 19 ||
      cvv.length < 3 ||
      expirationDate.length < 5
    ) {
      return Alert.alert(FIELDS_REQUIRED);
    }

    getDataLocalStorage<PaymentType[]>('payments').then(payments => {
      if (!payments) {
        payments = [];
      }
      const newId = Math.floor(Math.random() * 1000000);
      const newPayment: PaymentType = {
        id: newId,
        cardHolderName: cardHolderName,
        cardNumber: cardNumber,
        expiryDate: expirationDate,
        cvv: cvv,
        type: 'visa',
        isDefault: false,
      };
      payments.push(newPayment);
      setDataLocalStorage('payments', payments);
      navigation.goBack();
    });
  };

  return (
    <View style={styles.root}>
      <Header title={'Add Payment Method'} onPress={handleBack} />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.paymentContainer}>
            <Image style={styles.wave} source={img_wave} />
            <View style={styles.boxTop}>
              <Image style={styles.iconMastercard} source={ic_mastercard} />
              <Image style={styles.iconVisa} source={ic_visa} />
            </View>

            <Text style={styles.cardNumber}>**** **** **** XXXX</Text>

            <View style={styles.boxBottom}>
              <View>
                <Text style={styles.txtLabel}>Card Holder Name</Text>
                <Text style={styles.txtX}>XXXXXX</Text>
              </View>
              <View>
                <Text style={styles.txtLabel}>Expiry Date</Text>
                <Text style={styles.txtX}>XX/XX</Text>
              </View>
            </View>
          </View>

          <InputField
            label={'CardHolder Name'}
            placeholder={'Ex: Bruno Pham'}
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />

          <InputField
            label={'Card Number'}
            placeholder={'Ex: **** **** **** ****'}
            value={cardNumber}
            maxLength={19}
            keyboardType="numeric"
            onChangeText={text => {
              const formattedText = formatCardNumber(text);
              setCardNumber(formattedText);
            }}
          />

          <View style={styles.boxInputField}>
            <View style={{flex: 1}}>
              <InputField
                label={'CVV'}
                placeholder={'Ex: 123'}
                value={cvv}
                maxLength={3}
                onChangeText={setCvv}
              />
            </View>

            <View style={{flex: 1}}>
              <InputField
                label={'Expiration Date'}
                placeholder={'Ex: 03/22'}
                value={expirationDate}
                maxLength={5}
                keyboardType="numeric"
                onChangeText={text => {
                  const formattedText = formatExpirationDate(text);
                  setExpirationDate(formattedText);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.button}>
        <ButtonMain title={'ADD NEW CARD'} onPress={handleAddNewCard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },

  paymentContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: spacing.xxxl,
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

  boxInputField: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
  },

  button: {
    marginBottom: spacing.sm,
    marginHorizontal: spacing.lg,
  },
});

export default AddPaymentMethod;
