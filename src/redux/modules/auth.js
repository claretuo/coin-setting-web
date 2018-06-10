export const LOAD = 'auth/LOAD';
export const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'auth/LOAD_FAIL';
export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';
export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
export const RESET_MSG = 'auth/RESET_MSG';
export const RESET_ERROR = 'auth/RESET_ERROR';

const initialState = {
  loaded: false,
  user: null,
  forgotShow: false,
  logining: false,
  msg: '',
  error: '',
  reseting: false,
  resetShow: false
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
        loaded: true,
        user: action.data.loadUser.user,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error.message
      };
    case LOGIN:
      return {
        ...state,
        logining: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        logining: false,
        user: action.data.login.user,
        msg: '登录成功'
      };
    case LOGIN_FAIL:
      return {
        ...state,
        logining: false,
        user: null,
        error: action.error.message
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        menuList: []
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error.message
      };
    case RESET_MSG:
      return {
        ...state,
        msg: ''
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


export function isLoaded(globalState) {
  return globalState.financeAuth && globalState.financeAuth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    url: '/api/userInfo',
    method: 'get',
    dataParams: {},
  };
}

export function login(userNum, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    url: '/api/login',
    method: 'post',
    dataParams: {userNum, password}
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    url: '/api/logout',
    method: 'post',
    dataParams: {}
  };
}


// 清空消息
export function resetMsg() {
  return {
    type: RESET_MSG
  };
}

// 清空错误
export function resetError() {
  return {
    type: RESET_ERROR
  };
}
