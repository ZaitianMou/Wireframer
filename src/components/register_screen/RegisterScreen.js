import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler'
import firebase from '../../config/firebaseConfig';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleSubmit = (e) => {

    e.preventDefault();

    const { props, state } = this;
    const { firebase } = props;
    const newUser = { 
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      wireframers:[{
        "name": "Your first wireframer",
        "board_height": 650,
        "board_width": 650,
        "index": 0,
        "controls": []
      },
      {
        "name": "Your second wireframer",
        "board_height": 650,
        "board_width": 650,
        "index": 0,
        "controls": []
      }]


     };

    props.register(newUser, firebase);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Register</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
            {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);