import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthContainer from './AuthContainer'
import BandSelect from './BandSelect'
import BandAdd from './BandAdd'
import ShowAdd from './ShowAdd'
import Navigation from './Navigation'
import ShowView from './ShowView'
import NewContainer from './NewContainer'
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
      band_name: '',


      shows: [],



      bandshow_id: '',
      show_city: '',
      date: '',
      doors: '',
      show_email: '',
      show_id: '',
      loadIn: '',
      notes: '',
      poster_url: '',
      show_state: '',
      streetAddress: '',
      venue_id: '',
      venue_name: '',
      zipcode: ''
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
        band_name: '',

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
    if (e.target.value != null) {
      const bandData = e.target.value.split(",");
      this.setState({
        band_id: Number(bandData[0]),
        band_name: bandData[1]
      })
    } else {
      this.setState({
        band_id: null,
        band_name: ''
      })
    }
  }

  goHome = (e) => {
    e.preventDefault()
    console.log('goHome was called');
    this.props.history.push('/home')
  }

  getShowsOfBand = async () => {
    console.log('get shows was called');
    console.log(this.props.band_id, "band_id in get shows of band");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/band/${this.state.band_id}`)

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()
      console.log(parsedResponse);

      this.setState({
        shows: [...parsedResponse]
      })

    } catch (err) {
      console.log(err)
    }
  }

  setShow = (showindex, e) => {
    console.log('setShow was called');
    console.log(showindex, "show index");
    const show = this.state.shows[showindex]
    this.setState({
      bandshow_id: show.bandshow_id,
      show_city: show.city,
      date: show.date,
      doors: show.doors,
      show_email: show.email,
      show_id: show.id,
      loadIn: show.loadIn,
      notes: show.notes,
      poster_url: show.poster_url,
      show_state: show.state,
      streetAddress: show.streetAddress,
      venue_id: show.venue_id,
      venue_name: show.venue_name,
      zipcode: show.zipcode
    })
    this.props.history.push('/show/view')
  }



  render() {
    // console.log(this.state);
    return (
      <React.Fragment>
        <main>
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
              goHome={this.goHome}
              username={this.state.username}
              user_id={this.state.user_id}
              getBandsOfUser={this.getBandsOfUser}  />} />
            <Route exact path='/home' render={() => <Home 
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}
              getShowsOfBand={this.getShowsOfBand}
              shows={this.state.shows}
              setShow={this.setShow}/>} />
            <Route exact path='/show/view' render={() => <ShowView 
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}
              bandshow_id= {this.state.bandshow_id}
              city={this.state.city}
              date={this.state.date}
              doors={this.state.doors}
              email={this.state.email}
              show_id={this.state.show_id}
              loadIn={this.state.loadIn}
              notes={this.state.notes}
              poster_url={this.state.poster_url}
              state={this.state.state}
              streetAddress={this.state.streetAddress}
              venue_id={this.state.venue_id}
              venue_name={this.state.venue_name}
              zipcode={this.state.zipcode}/>} />
            <Route exact path='/new' render={() => <NewContainer
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}/>} />
            <Route exact path='/band/add' render={() => <BandAdd
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}
              getBandsOfUser={this.getBandsOfUser}/>}/>
            <Route exact path='/show/add' render={() => <ShowAdd
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}/>}/>
          </Switch>
        </main>
        <footer>
          <Navigation logout={this.logout}/>
        </footer>
      </React.Fragment>
    );
  }
}


export default withRouter(App);
