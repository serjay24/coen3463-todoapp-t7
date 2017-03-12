import React, { Component } from 'react';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: ""
    }
  }

  renderHeader() {
    if((this.state.userData.first_name === "") || (this.state.userData.last_name === "")) {
      return(
        <h2 className="center white-text">{this.state.userData.username}</h2>
      )
    }
    return (
      <h2 className="center white-text">{this.state.userData.first_name} {this.state.userData.last_name}</h2>
    )
  }

  render() {
    return (
    	<section className="black">
    		<br />
    		{this.renderHeader()}
    		<div className="container center">
        		<a className="waves-effect waves-light btn-flat center red white-text center" href="/auth/logout">
        		<i className="fa fa-sign-out small left"></i>Logout</a>
      		</div>
      		<br />
    	</section>
    );
  }

  fetchUserData() {
    axios.get("/api/user")
       .then(res => {
          this.setState({
            userData: res.data
          })
        })
  }

  componentDidMount() {
    this.fetchUserData();
    setInterval(this.fetchUserData, this.props.pollInterval);
  }
  
}

export default Header;