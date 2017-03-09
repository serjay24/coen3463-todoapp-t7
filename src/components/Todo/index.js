import _ from 'lodash';
import React, { Component } from 'react';
import TodoItems from '../TodoItems'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoArray: [],
      newItem: "Default Task Name",
      newNotes: ""
    };
    //this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  renderItems() {
    return (
      _.map(this.state.todoArray, (allTodo, index) => 
      <TodoItems key={index} todo={allTodo} delete={this.handleDelete.bind(this)} />
      )
    ) 
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
/*
  handleNotesChange(event) {
    if(event.target.value === "") {
      this.setState({
        newNotes: ""
      })
    }
    else {
      this.setState({
        newNotes: event.target.value
      })
    } 
  }
*/
  addNewTodo() {
    let newTodoItem = this.state.newItem
    this.setState({
      todoArray: this.state.todoArray.concat([newTodoItem])
    })
    this.refs.todoField.value="";
    this.setState({
      newItem:"Default Task Name",
      //newNotes: ""
    })
  }

  handleDelete(taskToDelete) {
    console.log("Click Outside");
    _.remove(this.state.todoArray, todo => todo === taskToDelete);
    this.setState({
      todoArray: this.state.todoArray
    })
  }

  render() {

    //let allTodo = this.state.todoArray;
    /*
    let allTodo = [];
    for (var index = 0; index < this.state.todoArray.length; index++) {
      allTodo.push(
        <TodoItems todo={this.state.todoArray[index].todo} notes={this.state.todoArray[index].notes} delete={this.delete} 
        key={index} />
      );
    }
    */
    /*
    let todoMap = allTodo.map((allTodos, index) => 
      <TodoItems todo={allTodos} delete={this.handleDelete} 
        key={index} />
    );
    */
    return (
/*
      <div>
        <input type='text' placeholder='Add Todo Here' onChange={this.onItemChange} />
        <button onClick={this.addNewTodo}>Add Todo</button>
        
        <br />

        <div className="row">
          {allTodo}
        </div>
      </div>
    );
*/
    <div>
      <div className="container center">
        <a className="waves-effect waves-light btn-flat center black white-text center" href="#modal1">Add Todo Item</a>
      </div>
          <div id="modal1" className="modal">
              <div className="modal-content">
                <h3 className="center">Add New Todo Item</h3>
                <input type='text' placeholder='Add Todo Here' ref="todoField" onChange={this.handleTodoChange.bind(this)} />
                
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