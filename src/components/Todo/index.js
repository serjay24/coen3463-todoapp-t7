import _ from 'lodash';
import React, { Component } from 'react';
import TodoItems from '../TodoItems';
import axios from 'axios'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoArray: [],
      userData: "",
      newItem: "Default Task Name",
    };
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

  test() {
    console.log(this.state);
  }

  render() {
    //<button onClick={this.test.bind(this)}>Testing</button>
    return (
    <div>
      <div className="container center">
        <a className="waves-effect waves-light btn-flat center black white-text center" href="#modal1">Add Todo Item</a>
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

          <div className="row">
            {this.renderItems()}
          </div>
      </div>
    )
  }
}

export default (Todo);