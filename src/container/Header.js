import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';

class Header extends Component {
	render() {
		return (
      <div style={{ width: 700, padding: 30 }}>
            <Navbar bg="dark">
              <Navbar.Brand href="/">
                Sentimental Analysis Visualization
              </Navbar.Brand>
            </Navbar>
      </div>
      )
    }
  }
  export default Header;