import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

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



export default ReportEncounter ;
