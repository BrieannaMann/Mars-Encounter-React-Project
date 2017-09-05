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
  if (this.state.name  == "" || this.state.age =="" || !this.state.job) {
      alert("Please complete required fields");
      event.preventDefault();
  } else {
alert("hello");
  axios.post("https://red-wdp-api.herokuapp.com/api/mars/colonists",
  {"colonist":
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
  <h1 className="flex desk-width-50 vertical-direction align-center padding-top-xl mobile-center red-font"> CHECK IN AT BASE CAMP </h1>
  <form className="padding-lg" >
  <h3 className="padding-sm red-font"> NAME</h3>
    <input type="text" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)}  />

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
        <input onClick={(event) => this.handleSubmit(event)} className="padding-sm" type="submit" value="Check in" />
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
    <h1 className="flex width-50 flex-center padding-med white desktop-drkblue">REPORT</h1>
  <form className="border-edge bkg-drkblue">
  <div className="flex vertical-direction">
    <h3 className="padding-sm white desktop-drkblue">ALIEN TYPE</h3>
    <div className="job-list drk-blue">
    <select name="alien" value={this.state.alien} onChange={(event) => this.handleChange(event)} >
    <option value="no" >Select Alien</option>
      {this.state.aliens.map(alien =>
        <option key={alien.id} > {alien.type} </option> )}
    </select>
    </div>
    <h3 className="padding-top-sm white desktop-drkblue">ACTION TAKEN</h3>
      <input className="action white desktop-drkblue" type="text" name="action"  value={this.state.action} onChange={(event) => this.handleChange(event)} />
    <div className="report flex flex-end  padding-top-xl">

    <Link to='/GetEncounters'>
      <input onClick={(event) => this.handleSubmit(event)} className="padding-sm" type="submit" value="SUBMIT REPORT"  />
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



export default App ;
