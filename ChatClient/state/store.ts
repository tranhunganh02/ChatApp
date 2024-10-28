import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {callReducer} from './reducers/callReducer';

const store = configureStore({
  reducer: {
    authReducer,
    callReducer
  },
});

export default store;