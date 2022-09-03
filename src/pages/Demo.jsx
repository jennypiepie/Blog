import React from 'react';
import demo1Img from '../assets/haunted-house.png'
import './less/demo.less'


function Demo() {
  return (
      <div className="content">
        <div className="demo-box">
          <div className="title">Haunted-House</div>
          <div className="demo-item">
            <a href="https://haunted-house-jennypiepie.vercel.app/" target="_blank">
              <img src={demo1Img} alt="" />
            </a>
          </div>
        </div>
      
      </div>
  );
}

export default Demo;
