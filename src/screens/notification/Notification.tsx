import {ic_search} from '@/assets/icons';
import {notificationData, NotificationTypeEnum} from '@/mock/notificationData';
import {colors, spacing} from '@/themes';
import React, {JSX} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {NotificationType} from '@/model/notification.model';

const Notification = (): JSX.Element => {
  const RenderItem = (notification: NotificationType) => (
    <View
      style={
        notification.type === NotificationTypeEnum.NEW ||
        notification.type === NotificationTypeEnum.HOT
          ? styles.itemContainer
          : null
      }>
      <View style={styles.boxItem}>
        {notification.image && (
          <Image source={notification.image} style={styles.imgItem} />
        )}
        <View style={styles.boxContent}>
          <Text style={styles.txtLabelItem}>{notification.label}</Text>
          <Text style={styles.txtContentItem}>{notification.content}</Text>
          {notification.type && (
            <Text
              style={
                notification.type === NotificationTypeEnum.HOT
                  ? styles.txtHot
                  : styles.txtNew
              }>
              {notification.type === NotificationTypeEnum.HOT
                ? 'Hot!'
                : notification.type === NotificationTypeEnum.NEW
                ? 'New'
                : ''}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <Image style={styles.icon} source={ic_search} />
        <Text style={styles.txtNotification}>Notification</Text>
        <View style={styles.placeholder}></View>
      </View>

      <FlatList
        data={notificationData}
        renderItem={({item}) => <RenderItem {...item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
  },

  tabBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
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
  placeholder: {
    width: 20,
    height: 20,
  },

  itemContainer: {
    backgroundColor: colors.disabled_field,
  },
  boxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  imgItem: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  boxContent: {
    flex: 1,
  },

  txtLabelItem: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
    fontWeight: '700',
  },
  txtContentItem: {
    color: colors.grey,
    fontFamily: 'NunitoSans',
    fontSize: 10,
    textAlign: 'justify',
    flexShrink: 1,
  },
  txtNew: {
    color: colors.success,
    fontFamily: 'NunitoSans',
    textAlign: 'right',
    fontWeight: '800',
  },
  txtHot: {
    color: colors.red,
    fontFamily: 'NunitoSans',
    textAlign: 'right',
    fontWeight: '800',
  },
  divider: {
    marginHorizontal: spacing.lg,
    height: 1,
    backgroundColor: colors.disabled_field,
  },
});

export default Notification;
