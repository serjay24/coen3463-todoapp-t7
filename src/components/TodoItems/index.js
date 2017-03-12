import React, { Component } from 'react';

import './style.css'

class TodoItems extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      error: ""
    }
  }

  renderCards() {
    if(this.state.isEditing) {
      return (
        <div>
          <div className="card-content black-text">
            <input type="text" className="card-title" ref="todoName" defaultValue={this.props.todo.name} />
          </div>
          <div className="card-action">
            <div className="row center">
              <div className="col s6 m6 l6">
                <i className="fa fa-floppy-o small blue-text action-bar" onClick={this.onSave.bind(this)}/>
              </div>
              <div className="col s6 m6 l6">
                <i className="fa fa-times small red-text action-bar" onClick={this.onCancel.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if(!this.props.todo.isCompleted) {
      return (
        <div>
          <div className="card-content black-text">
            <span className="card-title bold-text center" ref="todoName">{this.props.todo.name}</span>
            <p className="center">Created: {this.props.todo.createdDate}</p>
          </div>
          <div className="card-action">
            <div className="row center">
              <div className="col s4 m4 l4">
                <i className="fa fa-pencil-square-o small blue-text action-bar" onClick={this.handleEditTodo.bind(this)}/>
              </div>
              <div className="col s4 m4 l4">
                <i className="fa fa-check-square-o small black-text action-bar" onClick={this.onComplete.bind(this)} />
              </div>
              <div className="col s4 m4 l4">
                <i className="fa fa-trash small red-text action-bar" onClick={this.props.delete.bind(this, this.props.todo._id)} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="card-content white-text completed">
            <span className="card-title" ref="todoName">{this.props.todo.name}</span>
            <p className="center">Created: {this.props.todo.createdDate}</p>
          </div>
          <div className="card-action">
            <div className="row center">
              <div className="col s6 m6 l6">
                <i className="fa fa-square-o small green-text action-bar" onClick={this.onComplete.bind(this)}/>
              </div>
              <div className="col s6 m6 l6">
                <i className="fa fa-trash small red-text action-bar" onClick={this.props.delete.bind(this, this.props.todo._id)} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    
  }

  render() {
    return (
      <div>
        {
          this.props.todo.isCompleted ?
            <div className="col s12 m6 l4">
              <div className="card grey darken-3">
                {this.renderCards()}
              </div>
            </div>
          :
          <div className="col s12 m6 l4">
            <div className="card yellow lighten-3">
              {this.renderCards()}
            </div>
          </div>
        }
      </div>
    );
  }

  handleEditTodo() {
    this.setState({
      isEditing: true
    })
  }

  onSave() {
    var newTodo = this.refs.todoName.value;
    this.props.saveEditedTask(this.props.todo._id, newTodo);
    this.setState({
      isEditing: false
    })
  }

  onComplete() {
    this.props.completeTask(this.props.todo._id)
  }

  onCancel() {
    this.setState({
      isEditing: false
    })
  }
}

export default TodoItems;