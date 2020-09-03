import React, { Component } from "react";
import {connect} from "react-redux"
import * as actions from "../actions/index"

class TaskForm extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      id:"",
      name:"",
      status:false,   
    }
  }
   componentWillMount(){
    if(this.props.itemEditing){
      this.setState({
        id:this.props.itemEditing.id,
        name:this.props.itemEditing.name,
        status:this.props.itemEditing.status
      })
    }
  }
  componentWillReceiveProps(next){
    console.log(next);
    if(next && next.itemEditing){
      this.setState({
        id:next.itemEditing.id, 
        name:next.itemEditing.name,
        status:next.itemEditing.status
      })
    }
  }

  onCloseForm=()=>{/// truyền button ra ngoài cha để đóng form
    this.props.onCloseForm(); 
  }
  onChange=(event)=>{   /// thay đổi trang thái
    let target=event.target
    let name=target.name;
    let value=target.value
    if(name==="status"){value=target.value=== "true" ?true:false}
    this.setState({
        [name]:value
    })
  } 

  onSubmit=(event)=>{  /// truyền dữ liệu ra ngoài cha
    event.preventDefault();
    // this.props.onSubmit(this.state);
    this.props.onSaveTask(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear=()=>{       //set mặc định
    this.setState({
      id:"",
      name:"",
      status:false
    })
  }
 
  render() {    
    let{id}=this.state;
    if(!this.props.isDisplayForm )return'';
    return (
      <div>
        <div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{ id ?"Cập nhật công việc" : "Thêm công việc"}<button  className="fa fa-window-close text-right" style={{marginLeft:"50px"}} onClick={this.onCloseForm}></button></h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group" >
                  <label>Tên :</label>
                  <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <label>Trạng Thái :</label>
                <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                  <option value={true}>Kích Hoạt</option>
                  <option value={false}>Ẩn</option>
                </select>
                <br />
                <div className="text-center">
                  <button type="submit" className="btn btn-warning ">
                    Thêm
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-danger" onClick={this.onClear}>
                    Hủy Bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing

  } 
}

const mapDispatchToProps =(dispatch,props)=>{
  return{
    onSaveTask : (task)=>{
      dispatch(actions.saveTask(task))
    },
    onCloseForm:()=>{
      dispatch(actions.closeForm());
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm)

