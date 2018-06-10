export const LOAD = 'allowance/LOAD';
export const LOAD_SUCCESS = 'allowance/LOAD_SUCCESS';
export const LOAD_FAIL = 'allowance/LOAD_FAIL';
export const CREATE = 'allowance/CREATE';
export const CREATE_SUCCESS = 'allowance/CREATE_SUCCESS';
export const CREATE_FAIL = 'allowance/CREATE_FAIL';
export const RESET_ERROR = 'allowance/RESET_ERROR';

const initialState = {
  allowance: null,
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
        allowance: action.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message
      };
    case CREATE:
      return {
        ...state,
        loading: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true
      };
    case CREATE_FAIL:
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

export function load(coinName, {fromAddress, parentAddress, address}) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    url: `/api/allowance?coinName=${coinName}&fromAddress=${fromAddress}&parentAddress=${parentAddress}&address=${address}`,
    method: 'get',
    dataParams: {}
  };
}

export function createAllowance(coinName, data) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    url: `/api/allowance?coinName=${coinName}`,
    method: 'post',
    dataParams: data
  };
}

export function resetError() {
  return {
    type: RESET_ERROR
  };
}
