import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthContainer from './AuthContainer'
import BandSelect from './BandSelect'
import Navigation from './Navigation'
import Home from './Home'
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
      bands: [],
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
      // console.log(parsedResponse);

      if (response.ok) {
        this.setState({
          user_id: parsedResponse.id,
          password: '',
          verify_password: ''
        });
        console.log(this.state);
        // this.props.history.push('/home')
      }



    } catch (err) {
      console.log(err)
    }

  }

  handleLogin = async (e) => {
    e.preventDefault();
    // console.log("called handleRegiester");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }

      })

      const parsedResponse = await response.json()
      // console.log(parsedResponse);

      if (response.ok) {
        this.setState({
          user_id: parsedResponse.id,
          bio: parsedResponse.bio,
          city: parsedResponse.city,
          email: parsedResponse.email,
          name: parsedResponse.name,
          state: parsedResponse.state,
          password: '',
          verify_password: ''
        });
        // console.log(this.state);
        this.getBandsOfUser()
        this.props.history.push('/bandselect')
      }

    } catch (err) {
      console.log(err)
    }

  }

  logout = async (e) => {
    console.log('logout was called');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/logout`)

      const parsedResponse = await response.json()
      console.log(parsedResponse);

      this.setState({
        user_id: '',
        username: '',
        password: '',
        verify_password: '',
        name: '',
        email: '',
        bio: '',
        city: '',
        state: '',
        bands: [],
        band_id: '',
        band_name: ''
      })

    } catch (err) {
      console.log(err)
    }
  }

  getBandsOfUser = async () => {
    console.log("getBandsOfUser Was Called");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/bands/${this.state.user_id}`)

      const parsedResponse = await response.json()
      // console.log(parsedResponse);

      if (response.ok) {
        this.setState({
          bands: [...parsedResponse]
        })
        // return parsedResponse
    }


    } catch (err) {
      console.log(err)
    }
  }

  setBand = (e) => {
    e.preventDefault()
    if (e.target.value) {
      const bandData = e.target.value.split(",");
      this.setState({
        band_id: Number(bandData[0]),
        band_name: bandData[1]
      })
    }
  }

  goHome = (e) => {
    e.preventDefault()
    console.log('goHome was called');
    this.props.history.push('/home')
  }



  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <main>
          <h1>Welcome to my Friggen App</h1>
          <Switch>
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
            <Route exact path='/bandselect' render={() => <BandSelect 
              bands={this.state.bands}
              setBand={this.setBand}
              band_id={this.state.band_id}
              band_name={this.state.band_name}
              goHome={this.goHome}  />} />
            <Route exact path='/home' render={() => <Home 
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}/>} />
          </Switch>
        </main>
        <footer>
          <Navigation logout={this.logout}/>
        </footer>
      </React.Fragment>
    );
  }
}


              // { !this.state.user_id ? <Route exact path='/' render={() => <AuthContainer 
              //    handleRegister={this.handleRegister} 
              //    handleLogin={this.handleLogin}
              //    handleChange={this.handleChange}
              //    username={this.state.username}
              //    password={this.state.password}
              //    verify_password={this.state.verify_password}
              //    email={this.state.email}
              //    name={this.state.name}
              //    bio={this.state.bio}
              //    city={this.state.city}
              //    state={this.state.state}  />} /> : <Redirect to="/bandselect"/> }

export default withRouter(App);
