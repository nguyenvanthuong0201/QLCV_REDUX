import { combineReducers } from "redux";
import task from "./task";
import isDisplayForm from './isDisplayForm'
import itemEditing from './itemEditing'

let myReducer = combineReducers({
  task,
  isDisplayForm,
  itemEditing
});
export default myReducer;
