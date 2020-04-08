import React, { Component } from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from 'react-router-dom';
import HomePage from '../HomePage/HomePage.js';
import './Header.css';
class Header extends Component{
  constructor(props) {
       super(props);
       this.state = {
          data: 'Initial data...'
       }
       this.updateState = this.updateState.bind(this);
    };
    updateState() {
       this.setState({data: 'Data updated...'})
       console.log(this.state.data);
    }

   render(){
      return(

         <div>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
  <ul className="navbar-nav">
  <li className="nav-item active">
  <h2 className="text-secondary">Brain Change Knowledge Academy</h2>
  </li>
  </ul>
</nav>
<div>
<HomePage/>
</div>
</div>
      );
   }
}
export default Header;
