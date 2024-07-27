import {ImageSourcePropType} from 'react-native';

export type NotificationType = {
  id: number;
  image?: ImageSourcePropType;
  label: string;
  content: string;
  isShow: boolean;
};
