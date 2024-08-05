import {Header} from '@/commons';
import Label from '@/components/setting/Label';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import LabelInput from '../../components/setting/LabelInput';
import LabelSwitch from '../../components/setting/LabelSwitch';
import {ic_next} from '@/assets/icons';
import {colors, spacing} from '@/themes';
import {getDataLocalStorage} from '@/utils';
import {User} from '@/model/user.model';

type SettingProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Setting'>;
};

const Setting = ({navigation}: SettingProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [editableInformation, setEditableInformation] =
    useState<boolean>(false);
  const [editablePassword, setEditablePassword] = useState<boolean>(false);
  const [isSalesEnabled, setIsSalesEnabled] = useState<boolean>(false);
  const [isArrivalsEnabled, setIsArrivalsEnabled] = useState<boolean>(false);
  const [isDeliveryEnabled, setIsDeliveryEnabled] = useState<boolean>(false);

  useEffect(() => {
    getDataLocalStorage<User>('user').then(user => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
      }
    });
  }, []);

  const handleEditableInformation = (): void => {
    setEditableInformation(!editableInformation);
  };

  const handleEditablePassword = (): void => {
    setEditablePassword(!editablePassword);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const switchItems = [
    {
      label: 'Sales',
      isEnabled: isSalesEnabled,
      onChange: setIsSalesEnabled,
    },
    {
      label: 'New arrivals',
      isEnabled: isArrivalsEnabled,
      onChange: setIsArrivalsEnabled,
    },
    {
      label: 'Delivery status changes',
      isEnabled: isDeliveryEnabled,
      onChange: setIsDeliveryEnabled,
    },
  ];

  return (
    <View style={styles.root}>
      <Header title={'Setting'} onPress={handleBack} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Label
            label={'Personal Information'}
            isShowIcon={true}
            onPress={handleEditableInformation}
          />
          <LabelInput
            label={'Name'}
            onChangeText={setName}
            value={name}
            secureTextEntry={false}
            editable={editableInformation}
          />
          <LabelInput
            label={'Email'}
            onChangeText={setEmail}
            value={email}
            secureTextEntry={false}
            editable={editableInformation}
          />

          <View style={styles.box}>
            <Label
              label={'Password'}
              isShowIcon={true}
              onPress={handleEditablePassword}
            />
          </View>
          <LabelInput
            label={'Password'}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            editable={editablePassword}
          />

          <View style={styles.box}>
            <Label label={'Notifications'} isShowIcon={false} />
          </View>

          <View style={styles.boxSwitch}>
            {switchItems.map((item, index) => (
              <LabelSwitch
                key={index}
                label={item.label}
                isEnabled={item.isEnabled}
                onValueChange={item.onChange}
              />
            ))}
          </View>

          <View style={styles.box}>
            <Label label={'Help Center'} isShowIcon={false} />
          </View>

          <View style={styles.boxHelp}>
            <Text style={styles.txtFAQ}>FAQ</Text>
            <Image style={styles.icon} source={ic_next} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    rowGap: 15,
  },

  box: {
    marginTop: spacing.xxxl,
  },
  boxSwitch: {
    rowGap: 10,
  },

  boxHelp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    padding: spacing.lg,
  },
  txtFAQ: {
    color: colors.primary,
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    fontWeight: '700',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Setting;
