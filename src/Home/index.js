import React, { Component } from 'react'
import BandShows from '../BandShows'

class Home extends Component {
	constructor () {
		super()

		this.state = {
			shows: []
		}
	}

	componentDidMount() {
		this.getShowsOfBand()
	}

	getShowsOfBand = async () => {
		console.log('get shows was called');
		console.log(this.props.band_id, "band_id in get shows of band");
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/band/${this.props.band_id}`)

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


	render () {
		console.log(this.props, "props on home page");
		return (
			<div className="center">
				<h2>This is the home page</h2>
				<h3>Upcoming Shows</h3>
				<BandShows 
					username={this.props.username}
					user_id={this.props.user_id}
					band_name={this.props.band_name}
					band_id={this.props.band_id}
					shows={this.state.shows}/>
			</div>
		)
	}
}

export default Home