import {Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
export const appInfo = {
  sizes: {
    WIDTH: width,
    HEIGHT: height,
  },
 // BASE_URL: 'http://127.0.0.1:8001/v1/api/event_hub/',
 // BASE_URL: 'http://192.168.88.120:8001/v1/api/event_hub/',
  BASE_URL: 'http://127.0.0.1:3333/api/'
};