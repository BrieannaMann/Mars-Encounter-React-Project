import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

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
export default CheckIn ;
