import React, { Component } from 'react';
import TodoItems from '../TodoItems'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoArray: [],
      newItem: ""
    };
    this.onItemChange = this.onItemChange.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
  }

  onItemChange(event) {
    this.setState({
      newItem: event.target.value
    })
  }

  addNewTodo() {
    let newTodoItem = this.state.newItem
    this.setState({
      todoArray: this.state.todoArray.concat([newTodoItem])
    })
  }

  render() {
    let allTodo = [];
    for (var index = 0; index < this.state.todoArray.length; index++) {
      allTodo.push(
        <TodoItems todo={this.state.todoArray[index]} />
      );
    }

    return (
      <div>
        <input type='text' placeholder='Add Todo Here' onChange={this.onItemChange} />
        <button onClick={this.addNewTodo}>Add Todo</button>
        
        <br />

        <ul>
          {allTodo}
        </ul>
      </div>
    );
  }
}

export default Todo;