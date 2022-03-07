import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EmailCard from './EmailCard';

class ShowEmailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/emails')
      .then(res => {
        this.setState({
          emails: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowEmailList');
      })
  };


  render() {
    const emails = this.state.emails;
    console.log("PrintEmail: " + JSON.stringify(emails));
    let emailList;
    if(!emails) {
      emailList = "there is no email recored!";
    } else {
      emailList = emails.map((email, k) =>
        <EmailCard email={email} key={k} />
      );
    }

    return (
      <div className="ShowEmailList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Emails List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-email" className="btn btn-outline-warning float-right">
                + Add New Email
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {emailList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowEmailList;
