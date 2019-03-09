import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthContainer from './AuthContainer'
import './App.css';
require('dotenv').config()

class App extends Component {
  constructor () {
    super()

    this.state = {
      user_id: '',
      username: '',
      password: '',
      verify_password: '',
      name: '',
      email: '',
      bio: '',
      city: '',
      state: '',
      band_id: '',
      band_name: ''
    }
  }



  handleChange = (e) => {
    // console.log('handlechange is called');
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = async (e) => {
    e.preventDefault();
    // console.log("called handleRegiester");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }

      })

      const parsedResponse = await response.json()
      console.log(parsedResponse);

      // if (registerResponse.ok) {
      //   this.setState({
      //     user_id: registerParsed.id,
      //     username: registerParsed.username
      //   });
      //   this.listIngredients();
      //   this.props.history.push('/home')
      // }



    } catch (err) {
      console.log(err)
    }

  }

  handleLogin = async (e) => {
    e.preventDefault();
    // console.log("called handleLogin");

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
           password={this.state.password}
           verify_password={this.state.verify_password}
           email={this.state.email}
           name={this.state.name}
           bio={this.state.bio}
           city={this.state.city}
           state={this.state.state}  />} />




      </div>
    );
  }
}

export default App;
