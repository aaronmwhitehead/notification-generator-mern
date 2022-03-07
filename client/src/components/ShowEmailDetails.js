import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showEmailDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/emails/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showEmailDetails-API-response: " + res.data);
        this.setState({
          email: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowEmailDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/emails/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowEmailDetails_deleteClick");
      })
  };


  render() {

    const email = this.state.email;
    let EmailItem = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ email.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Content</td>
            <td>{ email.content }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowEmailDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Email List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Email's Record</h1>
              <p className="lead text-center">
                  View Email's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { EmailItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,email._id)}>Delete Email</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-email/${email._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Email
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Email</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Email</button> */}

        </div>
      </div>
    );
  }
}

export default showEmailDetails;
