import {ic_clock} from '@/assets/icons';
import {DeliveredOrder} from '@/model/deliveredOrder.model';
import {colors, spacing} from '@/themes';
import {functionFormat} from '@/utils';
import React, {JSX, memo} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

type OrderListProps = {
  data: DeliveredOrder[];
};
const OrderList = ({data}: OrderListProps): JSX.Element => {
  const RenderItem = ({item}: {item: DeliveredOrder}) => {
    const numStr = functionFormat(item.quantity);
    return (
      <View style={styles.orderItem}>
        <View style={styles.boxTop}>
          <Text style={styles.orderId}>{`Order No${item.id}`}</Text>
          <Text style={styles.orderTime}>{item.time}</Text>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.boxCenter}>
          <View style={styles.boxQuantity}>
            <Text style={styles.txtTitle}>Quantity:</Text>
            <Text style={styles.txtCommon}>{`${numStr}${item.quantity}`}</Text>
          </View>

          <View style={styles.boxTotal}>
            <Text style={styles.txtTitle}>Total Amount:</Text>
            <Text style={styles.txtCommon}>{`$${item.totalAmount}`}</Text>
          </View>
        </View>

        <View style={styles.boxBottom}>
          <View style={styles.button}>
            <Text style={styles.txtButton}>Detail</Text>
          </View>
          <View style={styles.boxProcessing}>
            {item.type === 'processing' && (
              <Image style={styles.icon} source={ic_clock} />
            )}
            <Text
              style={[
                item.type === 'processing'
                  ? styles.txtProcessing
                  : item.type === 'canceled'
                  ? styles.txtCanceled
                  : styles.txtDelivered,
              ]}>
              {item.type}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={RenderItem}
      contentContainerStyle={styles.flatStyle}
    />
  );
};

const styles = StyleSheet.create({
  flatStyle: {
    rowGap: 25,
  },
  orderItem: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    elevation: 2,
  },
  boxTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  orderId: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
  orderTime: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 14,
  },
  divider: {
    marginTop: spacing.sm,
    height: 2,
    borderRadius: 6,
    backgroundColor: colors.blur_grey,
  },
  boxCenter: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxQuantity: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  boxTotal: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  txtTitle: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
  txtCommon: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '700',
  },
  boxBottom: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 100,
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtButton: {
    color: colors.white,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
  txtDelivered: {
    marginRight: spacing.sm,
    color: colors.success,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },

  boxProcessing: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  txtProcessing: {
    marginRight: spacing.sm,
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    width: 20,
    height: 20,
  },

  txtCanceled: {
    marginRight: spacing.sm,
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default memo(OrderList);
