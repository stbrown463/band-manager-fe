import React from 'react'

const ConnectionList = ({venues, bands, contacts, makeConnection}) => {

	console.log(bands, "bands");
	console.log(contacts, "contacts");
	console.log(venues, "venues");

	const bandList = bands.map((band, i) => {

    return (
			<div className="card" key={band.id}>
				<h3>{band.name}</h3>
				<h4>{band.city}, {band.state}</h4>
				<a href={"mailto:" + band.email} onClick={makeConnection.bind(null, band.id, "bb")}>Email</a>		
			</div>
    )
  })

  const venueList = venues.map((venue, i) => {

    return (
			<div className="card" key={venue.id}>
				<h3>{venue.name}</h3>
				<h4>{venue.city}, {venue.state}</h4>
				<a href={"mailto:" + venue.email} onClick={makeConnection.bind(null, venue.id, "bv")}>Email</a>		
			</div>
    )
  })

 	// const contactList = contacts.map((contact, i) => {

  //   return (
		// 	<div className="card" key={contact.id}>
		// 		<h3>{contact.name}</h3>
		// 		<h4>{contact.city}, {contact.state}</h4>
		// 		<a href={"mailto:" + contact.email} onClick={makeConnection.bind(null, contact.id, "bv")}>Email</a>		
		// 	</div>
  //   )
  // })

return (
		<div className = "center">
			<h1>Connections</h1>
			<h3>Bands</h3>
			<div className="card-container">
				{bandList}
			</div>
			<h3>Venues</h3>
			<div className="card-container">
				{venueList}
			</div>
		</div>
	)
}


export default ConnectionList


			//<h3>Contacts</h3>
			// <div className="card-container">
			// 	{contactList}
			// </div>


