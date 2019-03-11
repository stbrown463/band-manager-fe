import React, { Component } from 'react'

const BandSearchResults = ({bands, addBandMember}) => {

  const bandList = bands.map((band) => {
    return (
        <li key={band.id} value={[band.id, band.name]}>
	        {band.name}, {band.city}
	        <button onClick={addBandMember.bind(null, band.id)}>I'm in this band</button>
        </li>
    )
  })


	return (
		<ul>
			{bandList}
		</ul>
	)
}

export default BandSearchResults