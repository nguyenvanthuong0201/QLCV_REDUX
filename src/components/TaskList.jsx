import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as action from "../actions/index";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, /// tất cả là -1 , active : 1 , deactive: 0;
    };
  }

  onChangeTaskList = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value; /// lấy dự liệu nhập vô đẩy ra cho index( cha)
    let filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status: name === "filterStatus" ? value : this.state.filterStatus,
    };
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value,
    });
  };

  render() {
    let { task, filterTable, keyword,sort } = this.props;
    // --filter table --
    if (filterTable.name) {
      task = task.filter((task) => {
        //dùng filter để trả về 1 cái task khác
        return (
          task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
        ); /// chuyển chuỗi (task.name)về thường và đặt điều kiện nếu nó ===1 thì không tìm thấy
      });
    }
    task = task.filter((task) => {
      if (filterTable.status === -1) {
        /// -1 là tất cả nên trả về lại task
        return task;
      } else {
        return task.status === (filterTable.status === 1 ? true : false); /// trả về true / false
      }
    });
    //--search
     if (keyword) {
      ////Search theo key word
      task = task.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    ///sort 
        ///sort giá trị trong mãng
    if (sort.by === "name") {
      task.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      task.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }

    let { filterName, filterStatus } = this.state; // trong thư mục TaskList
    let elmTask = task.map((task, index) => {
      //   Dùng vòng lập để danh sách ra truyền vào TaskItem
      return (
        <TaskItem
          task={task}
          index={index}
          key={index} ///truyền dữ liệu sang task Item
          // onDelete={this.props.onDelete}
        />
      );
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="filterName"
                  value={filterName}
                  onChange={this.onChangeTaskList}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChangeTaskList}
                >
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTask}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.task,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(action.filterTask(filter));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
