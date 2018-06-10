export const LOAD = 'ownerAddress/LOAD';
export const LOAD_SUCCESS = 'ownerAddress/LOAD_SUCCESS';
export const LOAD_FAIL = 'ownerAddress/LOAD_FAIL';
export const CREATE = 'ownerAddress/CREATE';
export const CREATE_SUCCESS = 'ownerAddress/CREATE_SUCCESS';
export const CREATE_FAIL = 'ownerAddress/CREATE_FAIL';
export const RESET_ERROR = 'ownerAddress/RESET_ERROR';

const initialState = {
  ownerAddress: null,
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
        ownerAddress: action.data
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

export function load(coinName, address) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    url: `/api/getOwnerAddress?coinName=${coinName}&fromAddress=${address}`,
    method: 'get',
    dataParams: {}
  };
}

export function createOwnerAddress(coinName, data) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    url: `/api/updateOwnerAddress?coinName=${coinName}`,
    method: 'post',
    dataParams: data
  };
}

export function resetError() {
  return {
    type: RESET_ERROR
  };
}
