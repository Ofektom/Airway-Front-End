import React from 'react';
import './LandingPageSubscribe.css';
const Subscription = () => (
    <div className="containerr">
      <div className="image-wrapper"></div>
      <div className="content-wrapper">
        <div className="subscription-box">
          <h1>Subscribe to our Newsletter</h1>
          <p>Lorem ipsum dolor sit amet consectetur. Turpis lectus maecenas ac cras interdum
            congue. Aliquam posuere tellus ac volutpat arcu nunc sapien platea. Venenatis
            nec eget scelerisque mattis facilisi auctor. Proin gravida elementum magna arcu urna..</p>
        </div>
          <form className="subscription-form">
            <input className='input-field' type="email" name="email" placeholder="Email Address" />
            <button className='btn' type="submit">Subscribe</button>
          </form>
      </div>
    </div>
  );
export default Subscription; 