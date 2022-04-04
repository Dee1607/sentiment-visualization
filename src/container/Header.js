import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';

class Header extends Component {
	render() {
		return (
      <div class="jumbotron" style={{ width: window.width, padding: 0 }}>
            <Navbar bg="dark" style={{background:"black"}}>
              <Navbar.Brand href="/" style={{color:"white"}}>
                Sentimental Analysis Visualization
              </Navbar.Brand>
            </Navbar>
      </div>
      )
    }
  }
  export default Header;