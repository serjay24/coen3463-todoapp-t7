import React, { Component } from 'react';

class Header extends React.Component {

  render() {
    return (
    	<section className="black">
    		<br />
    		<h2 className="center white-text">Serjay Ilaga</h2>
    		<div className="container center">
        		<a className="waves-effect waves-light btn-flat center red white-text center" href="/auth/logout">
        		<i className="fa fa-sign-out small left"></i>Logout</a>
      		</div>
      		<br />
    	</section>
    );
  }
}

export default Header;