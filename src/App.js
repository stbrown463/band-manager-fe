import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthContainer from './AuthContainer'
import BandSelect from './BandSelect'
import BandAdd from './BandAdd'
import ShowAdd from './ShowAdd'
import VenueAdd from './VenueAdd'
import ContactAdd from './ContactAdd'
import Navigation from './Navigation'
import ShowView from './ShowView'
import NewContainer from './NewContainer'
import Connections from './Connections'
import BandView from './BandView'
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
      zipcode: '',

      bandToView: {},

      venueConnects: [],
      bandConnects: [],
      contactConnects: []
    }
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister = async (e) => {
    e.preventDefault();

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

      if (response.ok) {
        this.setState({
          user_id: parsedResponse.id,
          password: '',
          verify_password: ''
        });
        console.log(this.state);
        this.getBandsOfUser()
        this.props.history.push('/bandselect')
      }



    } catch (err) {
      console.log(err)
    }

  }

  handleLogin = async (e) => {
    e.preventDefault();

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
        this.getBandsOfUser()
        this.props.history.push('/bandselect')
      }

    } catch (err) {
      console.log(err)
    }

  }

  logout = async (e) => {
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
    // console.log("getBandsOfUser Was Called");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/bands/${this.state.user_id}`)

      const parsedResponse = await response.json()

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
    this.props.history.push('/home')
  }

  getShowsOfBand = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/band/${this.state.band_id}`)

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()

      this.setState({
        shows: [...parsedResponse]
      })

    } catch (err) {
      console.log(err)
    }
  }

  setShow = (showindex, e) => {
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

  setBandToView = async (band_id, e) => {
    try {
      const response = await fetch (`${process.env.REACT_APP_API_URL}/bands/${band_id}`)

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()


      const responseShows = await fetch(`${process.env.REACT_APP_API_URL}/shows/band/${band_id}`)

      if (!responseShows.ok) {
        throw Error(responseShows.statusText)
      }

      const showResponse = await responseShows.json()

      this.setState({
        bandToView: {
          city: parsedResponse.city,
          email: parsedResponse.email,
          id: parsedResponse.id,
          img_url: parsedResponse.img_url,
          name: parsedResponse.name,
          state: parsedResponse.state,
          website: parsedResponse.website,
          shows: [...showResponse]
        }
      })

    } catch (err) {
      console.log(err)
    }
  }

  getConnections = async () => {
    try {
      const venues = await fetch (`${process.env.REACT_APP_API_URL}/connections/bv/${this.state.band_id}`)

      if (!venues.ok) {
        throw Error(venues.statusText)
      }

      const parsedVenues = await venues.json()

      const bands = await fetch (`${process.env.REACT_APP_API_URL}/connections/bb/${this.state.band_id}`)

      if (!bands.ok) {
        throw Error(bands.statusText)
      }

      const parsedBands = await bands.json()

      const contacts = await fetch (`${process.env.REACT_APP_API_URL}/connections/bc/${this.state.band_id}`)

      if (!contacts.ok) {
        throw Error(contacts.statusText)
      }

      const parsedContacts = await contacts.json()

      this.setState({
        venueConnects: [...parsedVenues],
        bandConnects: [...parsedBands],
        contactConnects: [...parsedContacts]
      })
      
    } catch (err) {
      console.log(err)
    }
  }



  render() {
    return (
      <React.Fragment>
        <main className="center">
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
              setShow={this.setShow}
              venueConnects={this.state.venueConnects}
              bandConnects={this.state.bandConnects}
              contactConnects={this.state.contactConnects}
              getConnections={this.getConnections}/>} />
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
              zipcode={this.state.zipcode}
              setBandToView={this.setBandToView}/>} />
            <Route exact path='/band/view' render={() => <BandView
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}
              getShowsOfBand={this.getShowsOfBand}
              shows={this.state.shows}
              setShow={this.setShow}
              bandToView={this.state.bandToView}/>} />
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
            <Route exact path='/venue/add' render={() => <VenueAdd
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}/>}/>
            <Route exact path='/contact/add' render={() => <ContactAdd
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}/>}/>
            <Route exact path='/connections' render={() => <Connections
              username={this.state.username}
              user_id={this.state.user_id}
              band_id={this.state.band_id}
              band_name={this.state.band_name}
              venueConnects={this.state.venueConnects}
              bandConnects={this.state.bandConnects}
              contactConnects={this.state.contactConnects}
              getConnections={this.getConnections}/>}/>
          </Switch>
        </main>
        <div className="clear"></div>
        <footer>
          <Navigation 
            logout={this.logout}
            user_id={this.state.user_id}/>
        </footer>
      </React.Fragment>
    );
  }
}


export default withRouter(App);
