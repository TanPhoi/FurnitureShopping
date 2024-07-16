import {useState} from 'react';

const useDisabled = () => {
  const [disabled, setDisabled] = useState(false);

  return {disabled, setDisabled};
};

export default useDisabled;
