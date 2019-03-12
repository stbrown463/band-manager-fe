import React from 'react'
import { DateTime } from "luxon";

const BandShows = ({shows, band_name, setShow}) => {

	
	console.log(shows);
	const showList = shows.map((show, i) => {

		// var local = DateTime.local(2017, 05, 15, 09, 10, 23);

		// local.zoneName; //=> 'America/New_York'
		// local.toString(); //=> '2017-05-15T09:10:23.000-04:00'

		// var iso = DateTime.fromISO("2017-05-15T09:10:23");

		// iso.zoneName; //=> 'America/New_York'
		// iso.toString(); //=> '2017-05-15T09:10:23.000-04:00'


		const date = (new Date(show.date)).toLocaleString("en-US", { timeZone: 'UTC' })
		// const date = DateTime.fromISO(show.date)

    return (
			<div className="card" key={show.id}>
				<h3>{show.venue_name}</h3>
				<p>
					{date}<br/>
					{show.city}, {show.state}<br /><br />
					<button onClick={setShow.bind(null, i)}>more details</button>
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