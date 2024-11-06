import React, { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid, Platform } from 'react-native';

interface ConfirmExitOnBackProps {
  exitMessage?: string;
}

const ConfirmExitOnBack: React.FC<ConfirmExitOnBackProps> = ({ exitMessage = "Una vez mas para salir" }) => {
  const backPressCount = useRef(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount.current === 0) {
        backPressCount.current += 1;
        ToastAndroid.show(exitMessage, ToastAndroid.SHORT);
        setTimeout(() => (backPressCount.current = 0), 2000);
      } else {
        BackHandler.exitApp();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [exitMessage]);

  return null;
};

export default ConfirmExitOnBack;
