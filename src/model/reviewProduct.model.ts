import {ImageSourcePropType} from 'react-native';

export type ReviewProductType = {
  id: number;
  image: ImageSourcePropType;
  name: string;
  time: string;
  rating: number;
  content: string;
};
