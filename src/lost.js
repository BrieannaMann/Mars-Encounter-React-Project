import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

class lost extends Component{
  constructor(props) {
   super(props);
 }
 render() {
   return (

     <div>
     <h3 className="padding-med flex flex-center"> LOOKS LIKE YOU ARE LOST IN </h3>
     <h1 className="padding-med flex flex-center">SPACE </h1>
     <div className="flex flex-center">
     <img className="errormessage flex align-center height-100" src="assets/404.png" />
     </div>
     <div className="flex flex-end padding-xl">
         <Link to='/'>
             <input className="red report-button"type="submit" value="GO HOME!" /></Link>
     </div>
     </div>

   );


}
}



export default lost ;
