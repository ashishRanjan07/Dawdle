// DNDManager.js
import { NativeModules } from 'react-native';

const { DNDManager } = NativeModules;

const enableDND = () => {
  DNDManager.enableDND();
};

const disableDND = () => {
  DNDManager.disableDND();
};

export default {
  enableDND,
  disableDND,
};
