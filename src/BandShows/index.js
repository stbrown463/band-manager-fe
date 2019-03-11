import React, { Component } from 'react'

class BandShows extends Component {
	componentDidMount() {
		this.getShowsOfBand()
	}

	getShowsOfBand = async () => {
		console.log('get shows was called');
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/band/${this.props.band_id}`)

			if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()
      console.log(parsedResponse);


		} catch (err) {
			console.log(err)
		}

	}

	addShowOfBand () {


		//   self.reqparse.add_argument(
	  //   'band_id',
	  //   required=True,
	  //   help='No id provided',
	  //   location=['form', 'json']
	  // )
	  // self.reqparse.add_argument(
	  //   'show_id',
	  //   required=True,
	  //   help='No id provided',
	  //   location=['form', 'json']
	  // )
	}

	render () {
		console.log(this.props, "props on BandShows");
		return (
			<p>band shows go here</p>

		)
	}
}


export default BandShows