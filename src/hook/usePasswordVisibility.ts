import {useState} from 'react';

type PasswordVisibilityState = {
  password: boolean;
  confirmPassword: boolean;
};

const usePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityState>({
      password: true,
      confirmPassword: true,
    });

  const togglePasswordVisibility = (field: keyof PasswordVisibilityState) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field],
    });
  };

  return {passwordVisibility, togglePasswordVisibility};
};

export default usePasswordVisibility;
