import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthContainer from './AuthContainer'
import './App.css';

class App extends Component {
  constructor () {
    super()

    this.state = {
      user_id: '',
      username: '',
      password: '',
      confirm_password: '',
      name: '',
      band_id: '',
      band_name: ''
    }
  }

  handleChange = (e) => {
    console.log('handlechange is called');
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = (e) => {
    console.log("called handleRegiester");
  }

  handleLogin = (e) => {
    e.preventDefault()
    console.log("called handleLogin");
  }



  render() {
    return (
      <div className="App">
        <h1>Welcome to my Friggen App</h1>
        <Route exact path='/' render={() => <AuthContainer 
           handleRegister={this.handleRegister} 
           handleLogin={this.handleLogin}
           handleChange={this.handleChange}
           username={this.state.username}
           password={this.state.password}  />} />
      </div>
    );
  }
}

export default App;
