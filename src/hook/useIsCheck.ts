import {useState} from 'react';

export type CheckValues = {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

const useIsCheck = () => {
  const [isCheck, setIsCheck] = useState<CheckValues>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  return {isCheck, setIsCheck};
};

export default useIsCheck;
