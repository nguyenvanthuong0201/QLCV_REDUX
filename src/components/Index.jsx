import React, { Component } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Control from "./Control";
import randomstring from "randomstring";
import { connect } from "react-redux";
import * as action from "../actions/index";
class Index extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   filter: {
    //     name: "",
    //     status: -1,
    //   },
    //   keyWord: "",
    //   sortBy: "name",
    //   sortValue: 1,
    // };
  }
  clickData = () => {
    var generate = [
      {
        id: randomstring.generate(),
        name: "Học lập trình",
        status: true,
      },
      {
        id: randomstring.generate(),
        name: "Học lập trình ReactJS",
        status: false,
      },
      {
        id: randomstring.generate(),
        name: "Học lập trình VueJS",
        status: false,
      },
    ];
    this.setState({
      task: generate,
    });
    localStorage.setItem("task", JSON.stringify(generate));
  };

  onToggleForm = () => {
    let {itemEditing}=this.props;
    if(itemEditing && itemEditing.id !==""){   //// xử lý nhấn button sửa rồi nhấn button thêm vẫn hiện taskForm
      this.props.onOpenForm();
    }
    else{
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id:"",
      name:"",
      status:false, 
    });

  };
  closeForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };
  openForm = () => {     
    this.setState({
      isDisplayForm: true,
    });
  };
  render() {
    let { isDisplayForm } = this.props;
    return (
      <div>
        <div>
          <div>
            <div className="container">
              <div className="text-center">
                <h1>Quản Lý Công Việc </h1>
                <hr />
              </div>
              <div className="row">
                <div
                  className={
                    isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
                  }
                >
                  <TaskForm />
                </div>
                <div
                  className={
                    isDisplayForm
                      ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                      : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  }
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onToggleForm}
                  >
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.clickData}
                  >
                    <span className="fa fa-plus mr-5"></span>Dữ liệu mẫu
                  </button>
                  <Control
                  />
                  <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <TaskList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(action.toggleForm());
    }, 
    onClearTask:(task)=>{
      dispatch(action.editTask(task)); /// làm cho task rổng
    },
    onOpenForm:()=>{
      dispatch(action.openForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
