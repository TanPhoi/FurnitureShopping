import {ImageSourcePropType} from 'react-native';

export type MyReviewsType = {
  id: number;
  image: ImageSourcePropType;
  name: string;
  price: number;
  time: string;
  rating: number;
  content: string;
};
