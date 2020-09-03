import * as types from "../constants/ActionTypes";
import randomstring from "randomstring";

let findIndex = (tasks, id) => {
  let result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

let data = JSON.parse(localStorage.getItem("task"));
let initialState = data ? data : [];
let myReducer = (state = initialState, action) => {
  //truy vấn state với action
  switch (action.type) {
    case types.LIST_ALL: ///hiển thị danh sách
      return state;

      
    case types.SAVE_TASK: ///thêm nhân viên
      console.log(action);
      let task = {
        id:action.task.id,
        name: action.task.name,
        status: action.task.status,
      };
      if(!task.id){
        task.id=randomstring.generate();
        state.push(task)
      }
      else
      { 
        let index = findIndex(state,task.id);
        state[index]=task
      }
      localStorage.setItem("task", JSON.stringify(state));
      return [...state];


    case types.UPDATE_STATUS_TASK: ///thay đổi status
      console.log(action);
      let id = action.id;
      let index = findIndex(state, id);
      state[index] = {
        ...state[index],
        status: !state[index].status,
      };
      localStorage.setItem("task", JSON.stringify(state));
      return [...state];

    case types.DELETE_TASK:  /// xóa phần tử trong list 
      console.log(action);
      let id1 = action.id;
      let index1 = findIndex(state, id1);
      state.splice(index1, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};
export default myReducer;
