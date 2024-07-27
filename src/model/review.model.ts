import {ImageSourcePropType} from 'react-native';

export type Review = {
  id: number;
  image: ImageSourcePropType;
  name: string;
  price: number;
  time: string;
  content: string;
};
