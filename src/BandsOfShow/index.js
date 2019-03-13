import React from 'react'
import { withRouter, Link } from 'react-router-dom'


const BandsOfShow = ({bands, setBandToView}) => {
	const showList = bands.map((band, i) => {
    return (
			<div className="card" key={band.id}>
				<h3>{band.band_name}</h3>
				<img src={band.img_url} alt={band.band_name}/>
				<p>
					{band.band_city}, {band.band_state}<br /><br />
					{band.email}<br/>
					{band.band_website}<br />
					<Link to={'/band/view'} id='bandView' onClick={setBandToView.bind(null, band.band_id)}>More Details</Link>
				</p>
			</div>
    )
  })

	return (
		<div className="center">
			<h2>Bands</h2>
			<div className="card-container">
				{showList}
			</div>
		</div>
	)
}

export default withRouter(BandsOfShow)