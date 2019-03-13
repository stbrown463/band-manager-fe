import React, { Component } from 'react'
import BandsOfShow from '../BandsOfShow'
import BandSearch from '../BandSearch'


class ShowView extends Component {
	constructor () {
		super()

		this.state = {
			bands: []
		}
	}

	componentDidMount() {
		this.getBandsOfShow()
	}

	getBandsOfShow = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/bands/${this.props.show_id}`)

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()

      this.setState({
        bands: [...parsedResponse]
      })

    } catch (err) {
      console.log(err)
    }
	}

  addBandToShow = async (band_id, e) => {
  	console.log('add band to show was called');
  	// connect bands first
  	// this.connectBands(band_id)
  	try {
  		
			const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/band/new`,{
			  method: 'POST',
			  body: JSON.stringify({
			  	band_id: band_id,
			  	show_id: this.props.show_id,
			  }),
			  credentials: 'include',
			  headers: {
			    'Content-Type': 'application/json'
			  }
			})
			if (!response.ok) {
			  throw Error(response.statusText)
			}
			const parsedResponse = await response.json()
			console.log(parsedResponse);
			this.getBandsOfShow()

			// console.log('Connect band to venue');
			const connection = await fetch (`${process.env.REACT_APP_API_URL}/connections/bv/new`, {
			  method: 'POST',
			  body: JSON.stringify({
			  	my_band_id: band_id,
			  	venue_id: this.props.venue_id,
			  	notes: '',
			  }),
			  credentials: 'include',
			  headers: {
			    'Content-Type': 'application/json'
			  }
			})

			const parsedConnection = await connection.json()

			if (connection.status === 200 && response.status === 201) {
				// reconnect with venue by c_id
				const reconnect = await fetch (`${process.env.REACT_APP_API_URL}/connections/bv/${parsedConnection.id}/reconnect`, {
				  method: 'PUT',
				  credentials: 'include',
				  headers: {
				    'Content-Type': 'application/json'
				  }
				})
				if (!reconnect.ok) {
					throw Error(connection.statusText)
				}
				const parsedReconnect = await reconnect.json()
				console.log(parsedReconnect);
			} else {
				console.log(parsedConnection);
			}

			// connect band with other bands of show

			// loop through the array of bands on the show
			// band (band_id) being added connects or reconnects to all other bands (this.state.bands[i].id) of show
			for (let i = 0; i < this.state.bands.length; i++) {
				if (band_id !== this.state.bands[i].band_id) {
					const addedBandConnection = await fetch (`${process.env.REACT_APP_API_URL}/connections/bb/new`, {
					  method: 'POST',
					  body: JSON.stringify({
					  	my_band_id: band_id,
					  	other_band_id: this.state.bands[i].band_id,
					  	notes: '',
					  }),
					  credentials: 'include',
					  headers: {
					    'Content-Type': 'application/json'
					  }
					})

					const parsedAddedBandConnection = await addedBandConnection.json()

					if (addedBandConnection.status === 200 && response.status === 201) {
						// reconnect with venue by c_id
						const addedBandReconnect = await fetch (`${process.env.REACT_APP_API_URL}/connections/bb/${parsedConnection.id}/reconnect`, {
						  method: 'PUT',
						  credentials: 'include',
						  headers: {
						    'Content-Type': 'application/json'
						  }
						})
						if (!addedBandReconnect.ok) {
							throw Error(connection.statusText)
						}
						const parsedAddedBandReconnect = await addedBandReconnect.json()
						console.log(parsedAddedBandReconnect, "parsedAddedBandReconnect");
					} else {
						console.log(parsedAddedBandConnection, "parsedAddedBandConnection");
					}

				// all other bands (this.state.bands[i].id) of show connect or reconnect to band (band_id) being added 
					const myBandConnection = await fetch (`${process.env.REACT_APP_API_URL}/connections/bb/new`, {
					  method: 'POST',
					  body: JSON.stringify({
					  	my_band_id: this.state.bands[i].band_id,
					  	other_band_id: band_id,
					  	notes: '',
					  }),
					  credentials: 'include',
					  headers: {
					    'Content-Type': 'application/json'
					  }
					})

					const parsedMyBandConnection = await myBandConnection.json()

					if (myBandConnection.status === 200 && response.status === 201) {
						// reconnect with venue by c_id
						const myBandReconnect = await fetch (`${process.env.REACT_APP_API_URL}/connections/bb/${parsedConnection.id}/reconnect`, {
						  method: 'PUT',
						  credentials: 'include',
						  headers: {
						    'Content-Type': 'application/json'
						  }
						})
						if (!myBandReconnect.ok) {
							throw Error(connection.statusText)
						}
						const parsedMyBandReconnect = await myBandReconnect.json()
						console.log(parsedMyBandReconnect, "parsedMyBandReconnect");
					} else {
						console.log(parsedMyBandConnection, "parsedMyBandConnection");
					}
				}
			}
  	} catch (err) {
  		console.log(err)
  	}
  }


	render () {
		return (
			<div className="center">
				<img src={this.props.poster_url} alt={this.props.date} />
				<h1>{this.props.venue_name} - {new Date(this.props.date).toLocaleDateString("en-US", { timeZone: 'UTC' })}</h1>
				<div className="row-around">
					<p>
						{this.props.streetAddress}<br />
						{this.props.city}, {this.props.state}, {this.props.zipcode}<br />
					</p>
					<p>
						Load In: {new Date(this.props.loadIn).toLocaleTimeString("en-US", { timeZone: 'UTC' })}<br />
						Doors: {new Date(this.props.doors).toLocaleTimeString("en-US", { timeZone: 'UTC' })}<br />
						Show: {new Date(this.props.date).toLocaleTimeString("en-US", { timeZone: 'UTC' })}<br />
					</p>
					<p>
						Notes: {this.props.notes}
					</p>
				</div>
				<BandsOfShow 
					bands={this.state.bands}
					user_id={this.props.user_id}
					setBandToView={this.props.setBandToView}/>
				<BandSearch 
					user_id={this.props.user_id}
					addBandToShow={this.addBandToShow}/>
			</div>

		)
	}
}

export default ShowView