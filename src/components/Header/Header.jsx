import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Header extends Component {
c = 'opu';
  render() {
    return (
      <>
      <h1>{this.c}</h1>
      <header>
        <div className="container">
          <nav>
            <div className="logoHolder">
              <Link to="/"><img src="assets/images/android-chrome-512x512.png" alt="" /></Link>
            </div>
            <div className="mobileMenu"></div>
            <div className="dskMenu">
              <ul>
                <li><Link to="/"></Link></li>
                <li><Link to="/news"></Link></li>
                <li><Link to="/about"></Link></li>
                <li><Link to="/contact"></Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      </>
    )
  }
}

export default Header