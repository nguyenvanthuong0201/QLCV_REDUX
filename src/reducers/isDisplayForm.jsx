import * as types from "../constants/ActionTypes";
let initialState=false
let myReducer = (state = initialState,action)=>{
    switch (action.type) {
        case types.TOGGLE_FORM:
            return !state;
        case types.CLOSE_FORM:
            return false;
        case types.OPEN_FORM:
            return true;
        default: return state    // phair return về state
    }
}
export default myReducer