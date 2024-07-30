import {ic_add, ic_checkbox, ic_edit} from '@/assets/icons';
import Header from '@/commons/headers/Header';
import {message} from '@/constants/message.constant';
import {ShippingAddressType} from '@/model/shippingAddressType.model';
import {User} from '@/model/user.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {getDataLocalStorage, setDataLocalStorage} from '@/utils';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ShippingAddressProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'ShippingAddress'>;
};

const ShippingAddress = ({navigation}: ShippingAddressProps): JSX.Element => {
  const [addresses, setAddresses] = useState<ShippingAddressType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadAddresses = () => {
        getDataLocalStorage<User>('user').then(user => {
          if (user?.addresses) {
            setAddresses(user.addresses);
          }
        });
      };
      loadAddresses();
    }, []),
  );

  const handleBack = (): void => {
    navigation.goBack();
  };

  const handleCheckbox = (id: number): void => {
    const updatedAddresses = addresses.map(address => ({
      ...address,
      isDefault: address.id === id ? !address.isDefault : false,
    }));

    getDataLocalStorage<User>('user')
      .then(user => {
        if (user) {
          user.addresses = updatedAddresses;
          setDataLocalStorage('user', user);
          setAddresses(updatedAddresses);
        }
      })
      .catch(err => {
        console.log(message.GET, err);
      });
  };

  const handleAddShipAddress = (): void => {
    navigation.navigate('AddShippingAddress');
  };

  const Item = ({item}: {item: ShippingAddressType}) => (
    <View style={styles.itemContainer}>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => handleCheckbox(item.id)}
          style={[styles.checkbox, item.isDefault && styles.checkedCheckbox]}>
          {item.isDefault && (
            <Image style={styles.checkmark} source={ic_checkbox} />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Use as the shipping address</Text>
      </View>

      <TouchableOpacity style={styles.addressContainer}>
        <View style={styles.boxName}>
          <Text style={styles.txtName}>{item.name}</Text>
          <Image style={styles.icon} source={ic_edit} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.txtAddress}>{item.address}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.root}>
      <Header title={'Shipping address'} onPress={handleBack} />

      <View style={styles.container}>
        <FlatList
          data={addresses}
          renderItem={Item}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity style={styles.boxAdd} onPress={handleAddShipAddress}>
        <Image style={styles.icon} source={ic_add} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    paddingHorizontal: spacing.lg,
    flex: 1,
  },
  itemContainer: {
    marginTop: spacing.xxl,
  },
  checkboxContainer: {
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

  addressContainer: {
    marginTop: spacing.sm,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    rowGap: 10,
  },
  boxName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  txtName: {
    fontSize: 18,
    fontFamily: 'NunitoSans',
    color: colors.primary,
    fontWeight: '700',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  divider: {
    marginTop: spacing.sm,
    height: 1,
    borderRadius: 6,
    backgroundColor: colors.secondary_button_gb,
  },
  txtAddress: {
    color: colors.text_secondary,
    lineHeight: 25,
    fontFamily: 'NunitoSans',
    paddingHorizontal: spacing.lg,
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
});

export default ShippingAddress;
