import { actionTypes } from './actions'
const initialState = {
    user: 'no',
  };
  
  function rootReducer(state = initialState, action) {

    if (action.type === actionTypes.LOG_IN) {
      return Object.assign({}, state, {
        user: action.payload
      });
    }

    return state;
  };
  
  export default rootReducer;