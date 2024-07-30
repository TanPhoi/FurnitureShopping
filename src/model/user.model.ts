import {ShippingAddressType} from './shippingAddressType.model';

export type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  addresses?: ShippingAddressType[];
};
