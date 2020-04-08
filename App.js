import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';

class App extends Component{
   render(){
      return(
         <div>
            <Header />
         </div>
      );
   }
}
export default App;
