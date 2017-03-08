import React, { Component } from 'react';
import Todo from '../Todo';
import Header from '../Header'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <Todo />
      </div>
    );
  }
}

export default App;
