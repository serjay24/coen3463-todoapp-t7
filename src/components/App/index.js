import React, { Component } from 'react';
import Todo from '../Todo';
import Header from '../Header';
import axios from 'axios';

class App extends Component {
  constructor(props) {
  	super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <Todo />
      </div>
    );
  }
/*
  fetchUser() {
  	axios.get("/api/user/").then(res => {
  		console.log(res.data)
  		this.setState({
  			userData: res.data
  		})
  	})
  }

  componentDidMount() {
    this.fetchUser();
    setInterval(this.fetchUser, 10000);
  }
*/
}

export default App;
