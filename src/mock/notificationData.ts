import {img_background_boarding, img_black_simple_lamp} from '@/assets/images';

export enum NotificationTypeEnum {
  NEW = 'new',
  HOT = 'hot',
  VIEWED = 'viewed',
  UNVIEWED = 'unviewed',
}

export const notificationData = [
  {
    id: 1,
    image: img_black_simple_lamp,
    label: 'Your order #123456789 has been confirmed',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.',
    type: NotificationTypeEnum.NEW,
  },
  {
    id: 2,
    image: img_background_boarding,
    label: 'Your order #123456789 has been canceled',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.',
    type: NotificationTypeEnum.VIEWED,
  },
  {
    id: 3,
    image: null,
    label: 'Discover hot sale furnitures this week.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.',
    type: NotificationTypeEnum.HOT,
  },
  {
    id: 4,
    image: img_black_simple_lamp,
    label: 'Your order #123456789 has been confirmed',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.',
    type: NotificationTypeEnum.VIEWED,
  },
  {
    id: 5,
    image: img_background_boarding,
    label: 'Your order #123456789 has been canceled',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.',
    type: NotificationTypeEnum.VIEWED,
  },
  {
    id: 6,
    image: img_background_boarding,
    label: 'Your order #123456789 has been canceled',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.',
    type: NotificationTypeEnum.VIEWED,
  },
  {
    id: 7,
    image: img_background_boarding,
    label: 'Your order #123456789 has been canceled',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec.',
    type: NotificationTypeEnum.VIEWED,
  },
];
