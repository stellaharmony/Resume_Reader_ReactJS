import React, { Component } from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from 'react-router-dom';
import HomePage from '../HomePage/HomePage.js';
import './Header.css';
class Header extends Component{
  constructor(props) {
       super(props);
    };

   render(){
      return(

         <div>
            <nav className="navbar bg-dark navbar-dark">
                <ul className="navbar-nav">
                <li className="nav-item active">
                <h2 className="text-light">Brain Change Knowledge Academy</h2>
                </li>
                </ul>
            </nav>
            <div className="container">
            <HomePage/>
            </div>
        </div>
      );
   }
}
export default Header;
