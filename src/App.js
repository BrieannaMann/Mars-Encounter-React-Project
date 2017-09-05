import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

class App extends Component{
  constructor(props) {
   super(props);
 }
 render() {
   return (
     <Router>
     <div>
        <Route exact path='/CheckIn' component={CheckIn} />
        <Route path='/ReportEncounter' component={ReportEncounter} />
        <Route path='/GetEncounters' component={GetEncounters} />

     </div>
     </Router>
    //  <Switch>
    //  <div>
    //     <Route exact path='/CheckIn' component={CheckIn} />
    //     <Route path='/ReportEncounter' component={ReportEncounter} />
    //     <Route path='/GetEncounters' component={GetEncounters} />
     //
    //  </div>
    //  </Switch>
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
  event.preventDefault();
  axios.post("https://red-wdp-api.herokuapp.com/api/mars/colonists", {
"colonist":
  {"name":this.state.name,
  "age": this.state.age,
  "job_id" : this.state.job}
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
<div className="side-banner">
  <h1 className="flex width-50 vertical-direction align-center padding-top-xl red-font"> CHECK IN AT BASE CAMP </h1>
  <form className="padding-lg" onSubmit={this.handleSubmit}>
  <h3 className="padding-sm red-font"> NAME</h3>
    <input type="text" name="name" onChange={ (event) => this.handleChange(event)}  />

  <h3 className="padding-sm red-font"> AGE </h3>
    <input type="number" name="age" value={this.state.age} onChange={(event) => this.handleChange(event)} />
  <h3 className="padding-sm red-font"> OCCUPATION </h3>
  <div className="job-list drk-blue">
    <select name="job" value={this.state.job} onChange={(event) => this.handleChange(event)} >
      <option value="no" >Select your Occupation</option>
        {this.state.jobs.map(job =>
        <option value={job.id} >{job.name}  </option>)}
    </select>
    </div>

    <div className="width-50 flex flex-end padding-top-xl">
      <Link to='/GetEncounters'>
        <input className="padding-sm" type="submit" value="Check in" />

      </Link>
      </div>
        </form>
    </div>

    );
  }

}


class ReportEncounter extends Component {
constructor(props) {
 super(props);
 this.state={
   aliens:[],
   action: ""};
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
this.setState({[event.target.name] : event.target.value});
}

handleSubmit(event) {

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
  <div className="report-banner">
  <div className="flex vertical-direction flex-right banner-edge">
    <h1 className="flex width-50 flex-center padding-med">REPORT</h1>
  <form className="border-edge">
  <div className="flex vertical-direction">
    <h3 className="padding-sm">ALIEN TYPE</h3>
    <div className="job-list drk-blue">
    <select name="alien" value={this.state.alien} onChange={this.handleChange} >
    <option value="no" >Select Alien</option>
      {this.state.aliens.map(alien =>
        <option key={alien.id} > {alien.type} </option> )}
    </select>
    </div>
    <h3 className="padding-top-sm">ACTION TAKEN</h3>
      <input className="action" type="text" name="action"  value={this.state.action} onChange={this.handleChange} />
    <div className="report flex flex-end  padding-top-xl">

    <Link to='/GetEncounters'>
      <input className="padding-sm" type="submit" value="SUBMIT REPORT"  onClick={this.handleSubmit}/>
    </Link>
    </div>
    </div>
  </form>
</div>
  </div>
  );
}}



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
  <div className="encounter-bkg">
    <h1 className="flex flex-center white"> RECENT ALIEN ENCOUNTERS</h1>
  <h3 className="secondary-font white flex flex-end width-75 padding-top-lg"> Recent Reports </h3>
  <form>
  <div className="flex border-edge">
  <div className="width-50">
  <div className=" report-box ">
  <h3 className="padding-med flex flex-center white">SEEN AN ALIEN</h3>
    <div className=" flex flex-center padding-bottom-med">
    <Link to='/ReportEncounter'>
        <input className="red report-button"type="submit" value=" REPORT IT NOW!" /></Link>
    </div>
    </div>
    <h3 className="white padding-top-xl">RECENT SIGHTINGS </h3>
    <div>
    </div>
    <div>
    </div>
    <div>
    </div>
    </div>

    <div className="encounter-list flex reverse-column width-50 border-sm white">
      {this.state.encounters.map(encounter =>
      <p key={encounter.id} >
      <div className="padding-sm">
      <p className="secondary-font"><strong>Date : </strong> {encounter.date} </p>
      <p className="secondary-font"><strong>Alien Type :</strong> {encounter.atype} </p>
      <p className="secondary-font"><strong> Action Taken : </strong>{encounter.action} </p>
      </div>
      </p>)}
    </div>
    </div>
    </form>
    </div>
    );
  }
}
class lost extends Component{
  constructor(props) {
   super(props);
 }
 render() {
   return (

     <div>
     <h3> LOOKS LIKE YOUR LOST IN </h3>
     <h1>SPACE </h1>
     <img className="errormessage" src="assets/404.png" />
     <Link to='/CheckIn'>
         <button value=" Report Encounter">
         </button>
         </Link>
     </div>

   );


}
}



export default App ;
