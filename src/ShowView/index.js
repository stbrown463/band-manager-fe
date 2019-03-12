import React, { Component } from 'react'
import BandsOfShow from '../BandsOfShow'







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
		console.log('getBandsOfShow was called');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shows/bands/${this.props.show_id}`)

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const parsedResponse = await response.json()
      console.log(parsedResponse);

      this.setState({
        bands: [...parsedResponse]
      })

    } catch (err) {
      console.log(err)
    }
	}




	render () {
		console.log(this.props, "props on show view page");
		console.log(this.state);
		return (
			<div className="center">
				<img src={this.props.poster_url} alt={this.props.date} />
				<h1>{this.props.venue_name}</h1>
				<p>
					{this.props.streetAddress}<br />
					{this.props.city}, {this.props.state}, {this.props.zipcode}<br />
				</p>
				<p>
					Load In: {this.props.loadIn}<br/>
					Doors: {this.props.doors}<br />
					Show: {this.props.date}<br />
				</p>
				<p>
					Notes: {this.props.notes}
				</p>

				<BandsOfShow bands={this.state.bands}/>
			</div>

		)
	}
}

export default ShowView