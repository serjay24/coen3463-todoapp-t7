import _ from 'lodash';
import React, { Component } from 'react';
import TodoItems from '../TodoItems';
import axios from 'axios'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoArray: "",
      userData: "",
      newItem: "Default Task Name",
      filterState: "all"
    };
  }

  handleFilter() {

  }

  renderItems() {
    return (
      _.map(this.state.todoArray, (allTodo, index) => 
      <TodoItems key={index} todo={allTodo} delete={this.handleDelete.bind(this)} saveEditedTask={this.saveEditedTask.bind(this)} 
      completeTask={this.completeTask.bind(this)}/>
      )
    ) 
  }

  saveEditedTask(oldTaskId, newTask) {
    var newTaskName;
    var taskId;

    _.find(this.state.todoArray, todo => {
      if(todo._id === oldTaskId) {
        //console.log(todo._id, taskId)
        //console.log(todo.isCompleted)
        taskId = todo._id;
        newTaskName = {
          name: newTask
        }
      }
    });

    var newTask = {
      data: newTaskName
    }
    //console.log(foundTodo);
    //console.log(this.state.todoArray)
    axios.put(`/api/${taskId}`, newTask).then(res => {
      this.setState({
        todoArray: res.data
      })
    })
  }

  completeTask(taskId) {
    var taskId;
    var taskStatus;
    _.find(this.state.todoArray, todo => {
      if(todo._id === taskId) {
        //console.log(todo._id, taskId)
        //console.log(todo.isCompleted)
        taskId = todo._id;
        taskStatus = {
          isCompleted: !todo.isCompleted
        }
      }
    });

    var isCompleted = {
      data: taskStatus
    }

    axios.put(`/api/${taskId}`, isCompleted).then(res => {
      this.setState({
        todoArray: res.data
      })
    })
  }

  handleTodoChange(event) {
    if(event.target.value === "") {
      this.setState({
        newItem: "Default Task Name"
      })
    }
    else {
      this.setState({
        newItem: event.target.value
      })
    } 
  }

  addNewTodo(event) {

    var dataToSave = {
      name: this.state.newItem
    }
    axios.post(`/api/${this.state.userData._id}/task`, dataToSave)
         .then(res => {
            console.log(res.data);
            this.setState({
              todoArray: res.data
            })
            //console.log(this.state.todoArray)
         })

    this.refs.todoField.value="";
  }

  handleDelete(taskToDeleteId) {
    var taskToDelete;

    console.log(this.props)

    _.find(this.state.todoArray, todo => {
      if(todo._id === taskToDeleteId) {
        //console.log(todo.name, taskToDeleteId);
        //console.log(todo._id);
        taskToDelete = todo._id;
      }
    });

    axios.delete(`/api/${taskToDelete}`).then(res => {
      console.log(res);
      this.setState({
        todoArray: res.data
      })
    })
  }
/*
  fetchTaskData() {
    
    axios.get("/api/task").then(res => {
      console.log(res.data)
      this.setState({
        todoArray: this.state.todoArray.concat(res.data),
        userData: this.props.userData
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.fetchTaskData();
    setInterval(this.fetchTaskData, this.props.pollInterval);
  }
*/
  
  componentWillMount() {
    //var data = this;

    axios.all([
      axios.get('/api/user'),
      axios.get(`/api/task/${this.state.filterState}`)
    ]).then(axios.spread((user, task) => {
      this.setState({
        userData: user.data,
        todoArray: task.data
      });
    }))
  }

  test() {
    console.log(this.state);
  }

  getAllTask() {
    axios.get('/api/task/all').then(res => {
      this.setState({
        todoArray: res.data
      })
    })
  }

  getOpenTask() {
    axios.get('/api/task/open').then(res => {
      this.setState({
        todoArray: res.data
      })
    })
  }

  getCompleteTask() {
    axios.get('/api/task/completed').then(res => {
      this.setState({
        todoArray: res.data
      })
    })
  }

  render() {
    //<button onClick={this.test.bind(this)}>Testing</button>
    return (
    <div>
      <div className="container center">
        <h2 className="center white-text">You have {this.state.todoArray.length} Task/s</h2>
        <a className="waves-effect waves-light btn-flat center black white-text center" href="#modal1">Add Todo Item</a>&nbsp;
        <a className="waves-effect waves-light btn-flat center red white-text center" href="#modal2">Delete All</a>
      </div>
      <br />
      <div className= "container center">
        <a className="waves-effect waves-light btn-flat center blue white-text center" href="#" onClick={this.getAllTask.bind(this)}>
        ALL
        </a>&nbsp;
        <a className="waves-effect waves-light btn-flat center yellow white-text center" href="#" onClick={this.getOpenTask.bind(this)}>
        Open</a>&nbsp;
        <a className="waves-effect waves-light btn-flat center grey darken-3 white-text center" href="#" onClick={this.getCompleteTask.bind(this)}>
        Completed</a>
      </div>
          <div id="modal1" className="modal">
              <div className="modal-content">
                <h3 className="center">Add New Todo Item</h3>
                <input type='text' placeholder='Add Todo Here' name="todoField" ref="todoField" onChange={this.handleTodoChange.bind(this)} />
                
              </div>
              <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat blue white-text center" 
                onClick={this.addNewTodo.bind(this)}>Add</a>
              </div>
          </div>

          {this.renderDeleteConfirmation()}

          <div className="row">
            {this.renderItems()}
          </div>
      </div>
    )
  }
  renderDeleteConfirmation() {
    return (
      <div id="modal2" className="modal">
        <div className="modal-content">
            <h5 className="center">Are you sure you want to delete all of your task?</h5>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-white btn-flat red white-text center">Delete</a>
        </div>
      </div>
    )
  }
}

export default (Todo);