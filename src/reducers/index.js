import { combineReducers } from "redux";
import task from "./task";
import isDisplayForm from './isDisplayForm'
import itemEditing from './itemEditing'
import filterTable from './filterTable'
import search from './search'
import sort from './sort'

let myReducer = combineReducers({
  task,
  isDisplayForm,
  itemEditing,
  filterTable,
  search,
  sort,
});
export default myReducer;
