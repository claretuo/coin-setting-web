import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import balance from './balance';
import allowance from './allowance';
import fee from './fee';
import feeAccount from './feeAccount';
import maxTransferNum from './maxTransferNum';
import ownerAddress from './ownerAddress';
import frozenAccount from './frozenAccount';

import logs from './logs';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  balance,
  logs,
  allowance,
  fee,
  feeAccount,
  frozenAccount,
  maxTransferNum,
  ownerAddress,
});
