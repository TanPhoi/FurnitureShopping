import {ButtonMain} from '@/commons';
import Header from '@/commons/headers/Header';
import DropdownField from '@/components/addShippingAddress/DropdownField';
import InputField from '@/components/addShippingAddress/InputField';
import {FIELDS_REQUIRED, GET_DATA_ERROR} from '@/constants/message.constant';
import {cityData} from '@/mock/cityData';
import {countryData} from '@/mock/countryData';
import {districtsData} from '@/mock/districtsData';
import {User} from '@/model/user.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  KeyboardTypeOptions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type AddShippingAddressProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamsList,
    'AddShippingAddress'
  >;
};

const AddShippingAddress = ({
  navigation,
}: AddShippingAddressProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [countryValue, setCountryValue] = useState<string | null>(null);
  const [cityValue, setCityValue] = useState<string | null>(null);
  const [districtValue, setDistrictValue] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  useEffect(() => {
    setCityValue('');
    setDistrictValue('');
  }, [countryValue]);

  const handleBack = (): void => {
    navigation.goBack();
  };

  const handleAddAddress = (): void => {
    if (!name || !address || !zipCode || !country || !city || !district) {
      Alert.alert(FIELDS_REQUIRED);
      return;
    }

    getDataLocalStorage<User>('user')
      .then(user => {
        if (user) {
          const newId = Math.random();
          const newAddress = {
            id: newId,
            name,
            address,
            zipCode,
            country,
            city,
            district,
            isDefault: false,
          };

          const updatedUser = {
            ...user,
            addresses: [...(user.addresses || []), newAddress],
          };

          setDataLocalStorage('user', updatedUser);
          navigation.goBack();
        }
      })
      .catch(error => {
        console.error(GET_DATA_ERROR, error);
      });
  };

  const handleChangeCountry = useCallback(
    (value: string, label: string): void => {
      setCountryValue(value);
      setCountry(label);
    },
    [],
  );

  const handleChangeCity = useCallback((value: string, label: string): void => {
    setCityValue(value);
    setCity(label);
  }, []);

  const handleChangeDistrict = useCallback(
    (value: string, label: string): void => {
      setDistrictValue(value);
      setDistrict(label);
    },
    [],
  );

  const inputFields = [
    {
      label: 'Full name',
      placeholder: 'Ex: Bruno Pham',
      value: name,
      keyboardType: 'default' as KeyboardTypeOptions,
      changeText: setName,
    },
    {
      label: 'Address',
      placeholder: 'Ex: 25 Robert Latouche Street',
      value: address,
      keyboardType: 'default' as KeyboardTypeOptions,
      changeText: setAddress,
    },
    {
      label: 'Zipcode (Postal Code)',
      placeholder: 'Ex: 12345',
      value: zipCode,
      keyboardType: 'numeric' as KeyboardTypeOptions,
      changeText: setZipCode,
    },
  ];

  const dropdownField = [
    {
      label: 'Country',
      placeholder: 'Select Country',
      value: countryValue,
      data: countryData,
      changeText: handleChangeCountry,
    },
    {
      label: 'City',
      placeholder: 'Select City',
      value: cityValue,
      data: countryValue ? cityData[countryValue] : [],
      changeText: handleChangeCity,
    },
    {
      label: 'District',
      placeholder: 'Select District',
      value: districtValue,
      data: cityValue ? districtsData[cityValue] : [],
      changeText: handleChangeDistrict,
    },
  ];

  return (
    <View style={styles.root}>
      <Header title={'Add shipping address'} onPress={handleBack} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {inputFields.map((item, index) => (
          <InputField
            key={index}
            label={item.label}
            placeholder={item.placeholder}
            value={item.value}
            keyboardType={item.keyboardType}
            onChangeText={item.changeText}
          />
        ))}

        {dropdownField.map((item, index) => (
          <DropdownField
            key={index}
            label={item.label}
            placeholder={item.placeholder}
            value={item.value}
            data={item.data}
            onChange={item.changeText}
          />
        ))}

        <View style={styles.button}>
          <ButtonMain title={'SAVE ADDRESS'} onPress={handleAddAddress} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    paddingHorizontal: spacing.lg,
  },
  button: {
    marginTop: spacing.xxxm,
    marginBottom: spacing.lg,
  },
});

export default AddShippingAddress;
