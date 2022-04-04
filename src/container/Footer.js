import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocialIcon } from 'react-social-icons';

class Footer extends React.Component
{
  render()
  {
    return (
        <div class="jumbotron text-center" style={{ width: window.width, padding: 0 }}>
        <div style={{ width: window.width, padding: 30, background:"black" }}>
        <div style={{color:"white"}}>
          <div className='row'>
            <href src="#"> copyright © 2022 all rights reserved</href>
            {/* <href src="#"> copyright © 2022 all rights reserved</href> */}
          </div>
          <div className='row'>
            <br />
          </div>
          <div className='row'>
          <div className='col-md-4'> 
            <SocialIcon fgColor="black" bgColor='white' style={{}} url="https://twitter.com/deepprashantku1" />
            </div>
            <div className='col-md-4'> 
            <SocialIcon fgColor="black" bgColor='white' style={{}} url="https://github.com/Dee1607" />
            </div>
            <div className='col-md-4'>
            <SocialIcon fgColor="black" bgColor='white' style={{}} url="https://www.linkedin.com/in/deep-1607/" />

            </div>
          </div>
        </div>
      </div>
      </div>

    )
  }
}
export default Footer;