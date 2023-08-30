import { actionTypes } from './actions'
const initialState = {
    user: 'Admin HypeTex',
    sidebar: '',
    theme: 'default',
    zone: '',
    responsiveFontSizes: true,
  };
  
  function rootReducer(state = initialState, action) {

    if (action.type === actionTypes.LOG_IN) {
      return Object.assign({}, state, {
        user: action.payload
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




    return state;
  };
  
  export default rootReducer;