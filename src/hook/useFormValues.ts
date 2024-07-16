import {useState} from 'react';

export type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useFormValues = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return {formValues, setFormValues, handleChange};
};

export default useFormValues;
