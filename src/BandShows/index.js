import React from 'react'

const BandShows = ({shows, band_name}) => {

	const dinner = Math.floor(Math.random() * 2)
	console.log(dinner, "dinner vote");
	
	console.log(shows);
	const showList = shows.map((show) => {
		const date = (new Date(show.date)).toLocaleString("en-US")
	




    return (
			<div className="card" key="show.id">
				<h3>{band_name} @ {show.venue_name}</h3>
				<p>
					{date}<br/>
					{show.city}, {show.state}
				</p>
			</div>
    )
  })






return (
		<div className="card-container">
			{showList}
		</div>
	)
}


export default BandShows


// bandshow_id: "1"
// city: "Chicago"
// date: "Tue, 04 Sep 1990 00:09:00 -0000"
// doors: "Tue, 04 Sep 1990 08:00:00 -0000"
// email: "bk@bk.com"
// id: 1
// loadIn: "Tue, 04 Sep 1990 06:00:00 -0000"
// notes: " another show"
// poster_url: "sam.jpg"
// state: "IL"
// streetAddress: "Belmont and Damen"
// venue_id: "1"
// venue_name: "Beat Kitchen"
// zipcode: "60647"