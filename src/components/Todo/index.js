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
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.delete = this.delete.bind(this);
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

  addNewTodo() {
    let newTodoItem = {
      todo: this.state.newItem,
      notes: this.state.newNotes
    }
    this.setState({
      todoArray: this.state.todoArray.concat([newTodoItem])
    })
    this.refs.todoField.value="";
    this.refs.notesField.value="";
    this.setState({
      newItem:"Default Task Name",
      newNotes: ""
    })
  }

  delete(event) {
    console.log("Click from outside");
    var array = this.state.todoArray;
    var index = array.indexOf(event.target.value);
    console.log(index);
    array.splice(index, 1);
    this.setState({
      todoArray:array
    })
  }

  render() {
    let allTodo = [];
    for (var index = 0; index < this.state.todoArray.length; index++) {
      allTodo.push(
        <TodoItems todo={this.state.todoArray[index].todo} notes={this.state.todoArray[index].notes} delete={this.delete} />
      );
    }

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
                <input type='text' placeholder='Add Todo Here' ref="todoField" onChange={this.handleTodoChange} />
                <input type='text' placeholder='Add Notes Here' ref="notesField" onChange={this.handleNotesChange} />
              </div>
              <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat blue white-text center" 
                onClick={this.addNewTodo}>Add</a>
              </div>
          </div>

          <div className="row">
            {allTodo}
          </div>
      </div>
    )
  }
}

export default Todo;