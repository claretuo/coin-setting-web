export const LOAD = 'maxTransferNum/LOAD';
export const LOAD_SUCCESS = 'maxTransferNum/LOAD_SUCCESS';
export const LOAD_FAIL = 'maxTransferNum/LOAD_FAIL';
export const CREATE = 'maxTransferNum/CREATE';
export const CREATE_SUCCESS = 'maxTransferNum/CREATE_SUCCESS';
export const CREATE_FAIL = 'maxTransferNum/CREATE_FAIL';
export const RESET_ERROR = 'maxTransferNum/RESET_ERROR';

const initialState = {
  maxTransferNum: null,
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
        maxTransferNum: action.data
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

export function load(coinName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    url: `/api/maxTransferNum?coinName=${coinName}`,
    method: 'get',
    dataParams: {}
  };
}

export function createMaxTransferNum(coinName, data) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    url: `/api/maxTransferNum?coinName=${coinName}`,
    method: 'post',
    dataParams: data
  };
}

export function resetError() {
  return {
    type: RESET_ERROR
  };
}
