import React, { Component } from 'react'
import ConnectionList from '../ConnectionList'

class Connections extends Component {
	componentDidMount () {
		this.props.getConnections()
	}

	makeConnection = async (id, type, e) => {
		// e.preventDefault()
		// console.log('connect with band was called');
		// console.log('this is id=', id);
		// console.log('this is type=', type);

		let connectionBody = {}
		if (type === 'bv') {
			connectionBody = {
					my_band_id: this.props.band_id,
			  	venue_id: id,
			  	notes: ''
			} 
		}
		if (type === 'bb') {
			connectionBody = {
					my_band_id: this.props.band_id,
			  	other_band_id: id,
			  	notes: ''
			} 
		}
		if (type === 'bc') {
			connectionBody = {
					my_band_id: this.props.band_id,
			  	contact_id: id,
			  	notes: ''
			} 
		}

		try {	
			const connection = await fetch (`${process.env.REACT_APP_API_URL}/connections/${type}/new`, {
			  method: 'POST',
			  body: JSON.stringify(connectionBody),
			  credentials: 'include',
			  headers: {
			    'Content-Type': 'application/json'
			  }
	  	})
			const parsedConnection = await connection.json()
			console.log(connection.status);

			if (connection.status === 200) {
				// reconnect with venue by c_id
				const reconnect = await fetch (`${process.env.REACT_APP_API_URL}/connections/${type}/${parsedConnection.id}/reconnect`, {
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
		} catch (err) {
			console.log(err)
		}
	}

	render () {
		console.log(this.props);
		return(
			<div>
				<ConnectionList 
					venues={this.props.venueConnects}
					bands={this.props.bandConnects}
					contacts={this.props.contactConnects}
					makeConnection={this.makeConnection}/>
			</div>
		)
	}
}

export default Connections

