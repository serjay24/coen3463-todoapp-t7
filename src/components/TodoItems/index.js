import React, { Component } from 'react';

import './style.css'

class TodoItems extends React.Component {

  render() {
    return (
      <li>
        <input type='checkbox' />
        {this.props.todo} &nbsp;
        <button className='delete'>Delete</button>
      </li>
    );
  }
}

export default TodoItems;