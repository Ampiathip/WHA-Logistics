import { actionTypes } from './actions'
const initialState = {
    user: {},
    sidebar: '',
    theme: 'default',
    zone: '',
    responsiveFontSizes: true,
    login: false,
    loading: false,
    token: '',

  };
  
  function rootReducer(state = initialState, action) {

    if (action.type === actionTypes.LOG_IN_SUCCESS) {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }

    if (action.type === actionTypes.LOG_IN_SUCCESS) {
      return Object.assign({}, state, {
        login: action.payload
      });
    }

    if (action.type === actionTypes.LOG_OUT_SUCCESS) {
      return Object.assign({}, state, {
        login: action.payload
      });
    }


    if (action.type === actionTypes.SIDE_BAR) {
      return Object.assign({}, state, {
        sidebar: action.payload
      });
    }

    if (action.type === actionTypes.THEME) {
      return Object.assign({}, state, {
        theme: action.payload
      });
    }

    if (action.type === actionTypes.ZONE) {
      return Object.assign({}, state, {
        zone: action.payload
      });
    }

    if (action.type === actionTypes.TOKEN_SUCCESS) {
      return Object.assign({}, state, {
        token: action.payload
      });
    }

    if (action.type === actionTypes.LOADING) {
      return Object.assign({}, state, {
        loading: action.payload
      });
    }



    return state;
  };
  
  export default rootReducer;