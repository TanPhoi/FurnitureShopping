import Header from '@/commons/headers/Header';
import OrderList from '@/components/myOrder/OrderList';
import {orderData} from '@/mock/orderData';
import {DeliveredOrder} from '@/model/deliveredOrder.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors, spacing} from '@/themes';
import {getDataLocalStorage} from '@/utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {JSX, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type MyOrderProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MyOrder'>;
};

const tabs = [
  {key: 'delivered', label: 'Delivered'},
  {key: 'processing', label: 'Processing'},
  {key: 'canceled', label: 'Canceled'},
];

const MyOrder = ({navigation}: MyOrderProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('delivered');
  const [processingList, setProcessingList] = useState<DeliveredOrder[]>([]);

  useEffect(() => {
    const getProcessing = (): void => {
      getDataLocalStorage<DeliveredOrder[]>('orderSuccess').then(order => {
        setProcessingList(order || []);
      });
    };
    getProcessing();
  }, []);

  const filterOrdersByType = (type: string): DeliveredOrder[] => {
    return orderData.filter(order => order.type === type);
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'delivered':
        return <OrderList data={filterOrdersByType('delivered')} />;
      case 'processing':
        return <OrderList data={processingList} />;
      case 'canceled':
        return <OrderList data={filterOrdersByType('canceled')} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'My order'} onPress={handleBack} />

      <View style={styles.tabs}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => setActiveTab(tab.key)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}>
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.activeTab}></View>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    rowGap: 10,
  },
  activeTab: {
    width: 40,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.disabled_button,
    fontFamily: 'NunitoSans',
    fontSize: 18,
  },
  activeTabText: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
});

export default MyOrder;
