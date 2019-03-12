import React from 'react'

const VenueSearchResults = ({venues, setVenue}) => {

  const venueList = venues.map((venue) => {
    return (
        <option key={venue.id} value={[venue.id, venue.name]}>{venue.name}</option>
    )
  })



	return (
		<select onChange={setVenue.bind(null)}>
			<option value={[null]}>No venue</option>
			{venueList}
		</select>
	)
}

export default VenueSearchResults