import React, { Component } from 'react';

import './style.css'

class TodoItems extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className="col s12 m6 l4" key={this.props.key}>
          <div className="card yellow lighten-3">
            <div className="card-content black-text">
              <span className="card-title" ref="todoName">{this.props.todo}</span>
              <p ref="notesName">{this.props.notes}</p>
            </div>
            <div className="row">
              <div className="col m1 l1"></div>
              <div className="col s12 m4 l4">
              	<button className='waves-effect waves-light btn flat blue white-text'>Completed</button>
              </div>
              <div className="col m2 l2"></div>
              <div className="col s12 m4 l4">
              	<button className='waves-effect waves-light btn flat red white-text' onClick={this.props.delete.bind(this, this.props.todo)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default TodoItems;