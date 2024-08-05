import Header from '@/commons/headers/Header';
import OrderList from '@/components/myOrder/OrderList';
import {deliveredOrderData} from '@/mock/deliveredOrderData';
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

const MyOrder = ({navigation}: MyOrderProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState('Delivered');
  const [processingList, setProcessingList] = useState<DeliveredOrder[]>([]);

  useEffect(() => {
    const getProcessing = (): void => {
      getDataLocalStorage<DeliveredOrder[]>('orderSuccess').then(order => {
        if (order) {
          setProcessingList(order);
        }
      });
    };
    getProcessing();
  }, []);

  const filterOrdersByType = (type: string): DeliveredOrder[] => {
    return deliveredOrderData.filter(order => order.type === type);
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Delivered':
        return <OrderList data={filterOrdersByType('Delivered')} />;
      case 'Processing':
        return <OrderList data={processingList} />;
      case 'Canceled':
        return <OrderList data={filterOrdersByType('Canceled')} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'My order'} onPress={handleBack} />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.tab}
          onPress={(): void => setActiveTab('Delivered')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Delivered' && styles.activeTabText,
            ]}>
            Delivered
          </Text>
          {activeTab === 'Delivered' && <View style={styles.activeTab}></View>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={(): void => setActiveTab('Processing')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Processing' && styles.activeTabText,
            ]}>
            Processing
          </Text>

          {activeTab === 'Processing' && <View style={styles.activeTab}></View>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={(): void => setActiveTab('Canceled')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Canceled' && styles.activeTabText,
            ]}>
            Canceled
          </Text>

          {activeTab === 'Canceled' && <View style={styles.activeTab}></View>}
        </TouchableOpacity>
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
