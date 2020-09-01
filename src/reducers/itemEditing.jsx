import * as types from "../constants/ActionTypes";
let initialState={}
let myReducer = (state = initialState,action)=>{
    switch (action.type) {
        case types.EDIT_ITEM:
            // console.log("edit",action)
            return action.task;
        default: return state;
    }
}
export default myReducer