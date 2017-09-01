import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component{
  constructor(props) {
   super(props);
 }
 render() {
   return (
     <Router>
     <div>
        <Route exact path='/' component={CheckIn} />
        <Route path='/ReportEncounter' component={ReportEncounter} />
        <Route path='/GetEncounters' component={GetEncounters} />
     </div>
     </Router>
   );


}
}
class CheckIn extends Component {
  constructor(props) {
   super(props);
   this.state = {
     name : "",
     age : "",
     jobs : []
   };

 }
handleChange(event) {
  this.setState({[event.target.name] : event.target.value});
}

handleSubmit(event) {

  axios.post("https://red-wdp-api.herokuapp.com/api/mars/colonists", {
"colonist":{"name":this.state.name,"age": this.state.age,  "job_id" : this.state.job}

})
  .then(function(response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


}
componentDidMount(){
  axios.get("https://red-wdp-api.herokuapp.com/api/mars/jobs")
   .then((res => {
     const jobs = res.data.jobs;
     this.setState({jobs});
   }))
   .catch((error) => {
     console.log(error);
   })
}
  render() {
    return (
          <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Name"  onChange={ (event) => this.handleChange(event)} />
                <input type="number" name="age" placeholder="Age" value={this.state.age} onChange={(event) => this.handleChange(event)} />
                <select name="job" value={this.state.job} onChange={(event) => this.handleChange(event)} >
                  <option value="no" >Select your Occupation</option>
                  {this.state.jobs.map(job =>
                    <option value={job.id} >{job.name}  </option>
                )}
                </select>
                <Link to='/GetEncounters'>
                <input type="submit" value="Check in" /></Link>
          </form>

    );
  }

}


class ReportEncounter extends Component {
constructor(props) {
 super(props);
 this.state={aliens:[],
   action: ""};

}
handleChange(event) {
this.setState({[event.target.name] : event.target.value});
}

handleSubmit(event) {
  event.preventDefault();
  axios.post("https://red-wdp-api.herokuapp.com/api/mars/encounters", {
"encounter":{
  "atype":this.state.alien,
  "date":  new Date(),
   "action" : this.state.action,
   "colonist_id": 2777}
})

  .then(function(response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}
componentDidMount(){
 axios.get("https://red-wdp-api.herokuapp.com/api/mars/aliens")
   .then(res => {
     const aliens = res.data.aliens;
     this.setState({ aliens});
 })
   .catch((error) => {
     console.log(error);
 });
}
render() {
  return (
    <form>
    <Link to='/GetEncounters'>
    <input type="submit" value="ENCOUNTERS" />
    </Link>
      <select name="alien" value={this.state.alien} onChange={this.handleChange} >
        <option value="no" >Select Alien</option>
        {this.state.aliens.map(alien =>
        <option key={alien.id} > {alien.type} </option> )}
        </select>
        <input type="text" name="action" placeholder="Action Taken" value={this.state.action} onChange={this.handleChange} />
          <input type="submit" value="Submit Report"  onClick={this.handleSubmit}/>
      </form>
  );
}
}



class GetEncounters extends Component {
  constructor(props) {
   super(props);
   this.state={encounters:[]};
  }

  componentDidMount(){
   axios.get("https://red-wdp-api.herokuapp.com/api/mars/encounters")
     .then(res => {
       const encounters = res.data.encounters;
       this.setState({ encounters});
   })
     .catch((error) => {
       console.log(error);
   });
 }
  render() {
    return (
      <div>
        <form>
        <div className="report-button">
        <Link to='/ReportEncounter'>
        <input type="submit" value=" Report Encounter" /></Link>
        </div>
        <div className="encounter-list">
        {this.state.encounters.map(encounter =>
          <p key={encounter.id} >{encounter.date} {encounter.atype}
          {encounter.action} </p>
        )}
        </div>

        </form>
      </div>
    );
  }
}




export default App ;
