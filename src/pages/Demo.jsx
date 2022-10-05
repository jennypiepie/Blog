import React from 'react';
import demo1Img from '../assets/haunted-house.png'
import demo2Img from '../assets/raging-sea.png'
import './less/demo.less'


function Demo() {
  return (
      <div className="demo-content">
        <div className="demo-box">
          <div className="title">Haunted-House</div>
          <div className="demo-item">
            <a href="https://haunted-house-jennypiepie.vercel.app/" target="_blank">
              <img src={demo1Img} alt="" />
            </a>
          </div>
        </div>
        <div className="demo-box">
          <div className="title">Raging-Sea</div>
          <div className="demo-item">
            <a href="https://raging-sea-gamma.vercel.app/" target="_blank">
              <img src={demo2Img} alt="" />
            </a>
          </div>
        </div>
      </div>
  );
}

export default Demo;
