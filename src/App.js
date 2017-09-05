import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CheckIn from './checkin';
import ReportEncounter from './reportencounter';
import GetEncounters from './getencounter';
import lost from './lost';

class App extends Component{
  constructor(props) {
   super(props);
 }
 render() {
   return (
     <Router>
     <div>
       <Switch>
          <Route exact path='/' component={CheckIn} />
          <Route path='/ReportEncounter' component={ReportEncounter} />
          <Route path='/GetEncounters' component={GetEncounters} />
          <Route component={lost}/>
       </Switch>
     </div>
     </Router>

   );
}
}


export default App ;
