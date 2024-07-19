import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar} from 'react-native';

const useStatusBarEffect = (): void => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setHidden(true, 'fade');
    }
    return () => {
      StatusBar.setHidden(false, 'fade');
    };
  }, [isFocused]);
};

export default useStatusBarEffect;
