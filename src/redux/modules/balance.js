export const LOAD = 'balance/LOAD';
export const LOAD_SUCCESS = 'balance/LOAD_SUCCESS';
export const LOAD_FAIL = 'balance/LOAD_FAIL';
export const CREATE_TRANSFER = 'balance/CREATE_TRANSFER';
export const CREATE_TRANSFER_SUCCESS = 'balance/CREATE_TRANSFER_SUCCESS';
export const CREATE_TRANSFER_FAIL = 'balance/CREATE_TRANSFER_FAIL';
export const CREATE_NEW_TOKEN = 'balance/CREATE_NEW_TOKEN';
export const CREATE_NEW_TOKEN_SUCCESS = 'balance/CREATE_NEW_TOKEN_SUCCESS';
export const CREATE_NEW_TOKEN_FAIL = 'balance/CREATE_NEW_TOKEN_FAIL';
export const CREATE_MINTTOKEN = 'balance/CREATE_MINTTOKEN';
export const CREATE_MINTTOKEN_SUCCESS = 'balance/CREATE_MINTTOKEN_SUCCESS';
export const CREATE_MINTTOKEN_FAIL = 'balance/CREATE_MINTTOKEN_FAIL';
export const CREATE_BURN = 'balance/CREATE_BURN';
export const CREATE_BURN_SUCCESS = 'balance/CREATE_BURN_SUCCESS';
export const CREATE_BURN_FAIL = 'balance/CREATE_BURN_FAIL';
export const CREATE_BURNFROM = 'balance/CREATE_BURNFROM';
export const CREATE_BURNFROM_SUCCESS = 'balance/CREATE_BURNFROM_SUCCESS';
export const CREATE_BURNFROM_FAIL = 'balance/CREATE_BURNFROM_FAIL';
export const RESET_ERROR = 'balance/RESET_ERROR';

const initialState = {
  balance: null,
  loading: false,
  created: false,
  error: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: action.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message
      };
    case CREATE_TRANSFER:
      return {
        ...state,
        loading: true
      };
    case CREATE_TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true
      };
    case CREATE_TRANSFER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message
      };
    case CREATE_NEW_TOKEN:
      return {
        ...state,
        loading: true
      };
    case CREATE_NEW_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true
      };
    case CREATE_NEW_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message
      };
    case CREATE_MINTTOKEN:
      return {
        ...state,
        loading: true
      };
    case CREATE_MINTTOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true
      };
    case CREATE_MINTTOKEN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message
      };
    case CREATE_BURN:
      return {
        ...state,
        loading: true
      };
    case CREATE_BURN_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true
      };
    case CREATE_BURN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message
      };
    case CREATE_BURNFROM:
      return {
        ...state,
        loading: true
      };
    case CREATE_BURNFROM_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true
      };
    case CREATE_BURNFROM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message
      };
    case RESET_ERROR:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
}

export function load(coinName, address) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    url: `/api/balance?coinName=${coinName}&fromAddress=${address}`,
    method: 'get'
  };
}

export function createTransfer(coinName, data) {
  return {
    types: [CREATE_TRANSFER, CREATE_TRANSFER_SUCCESS, CREATE_TRANSFER_FAIL],
    url: '/api/transfer?coinName=${coinName}',
    dataParams: data,
    method: 'post'
  };
}

export function mintToken(coinName, data) {
  return {
    types: [CREATE_MINTTOKEN, CREATE_MINTTOKEN_SUCCESS, CREATE_MINTTOKEN_FAIL],
    url: '/api/mintToken?coinName=${coinName}',
    dataParams: data,
    method: 'post'
  };
}

export function burn(coinName, data) {
  return {
    types: [CREATE_BURN, CREATE_BURN_SUCCESS, CREATE_BURN_FAIL],
    url: '/api/burn?coinName=${coinName}',
    dataParams: data,
    method: 'post'
  };
}

export function burnFrom(coinName, data) {
  return {
    types: [CREATE_BURNFROM, CREATE_BURNFROM_SUCCESS, CREATE_BURNFROM_FAIL],
    url: '/api/burnFrom?coinName=${coinName}',
    dataParams: data,
    method: 'post'
  };
}

export function registerTokenERC20(coinName, data) {
  return {
    types: [CREATE_NEW_TOKEN, CREATE_NEW_TOKEN_SUCCESS, CREATE_NEW_TOKEN_FAIL],
    url: '/api/registerTokenERC20?coinName=${coinName}',
    dataParams: data,
    method: 'post'
  };
}

export function resetError() {
  return {
    type: RESET_ERROR
  };
}
