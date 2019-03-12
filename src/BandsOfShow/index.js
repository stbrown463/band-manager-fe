import React from 'react'

const BandsOfShow = ({bands}) => {

	const showList = bands.map((band, i) => {

    return (
			<div className="card" key={band.id}>
				<h3>{band.band_name}</h3>
				<img src={band.img_url} alt={band.band_name}/>
				<p>
					{band.band_city}, {band.band_state}<br /><br />
					{band.email}<br/>
					{band.band_website}<br />
					<button>more details</button>
				</p>
			</div>
    )
  })

// band_id: "1"
// band_img_url: "sam.jpg"
// band_name: "laverne"
// city state website
// email: "lav@lav.com"
// id: "2"
// show_id: "2"

	return (
		<div className="center">
			<h3>Bands</h3>
			<div className="card-container">
				{showList}
			</div>
		</div>
	)
}

export default BandsOfShow