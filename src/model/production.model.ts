import {ImageSourcePropType} from 'react-native';

export type Product = {
  id: number;
  image: ImageSourcePropType;
  label: string;
  price: number;
  rate: number;
  review: number;
  desc: string;
  quantity: number;
};
