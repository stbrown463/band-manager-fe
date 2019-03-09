import React, { Component } from 'react'

class BandSelect extends Component {
	componentDidMount() {
    console.log('welcome to my friggen app');
    this.props.getBandsOfUser()
  }

	render() {
		console.log(this.props)
		return(
			<select>
				<option>Band</option>
			</select>

		)
	}
}

export default BandSelect