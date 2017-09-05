import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

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
export default GetEncounters ;
