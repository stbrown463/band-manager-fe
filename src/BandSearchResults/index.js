import React from 'react'

const BandSearchResults = ({bands, addBandMember, addBandToShow}) => {

  const bandList = bands.map((band) => {
    return (
    		<div>
	        <li key={band.id} value={[band.id, band.name]}>
		        {band.name}, {band.city}<br />
		        {!addBandToShow ? <button onClick={addBandMember.bind(null, band.id)}>I'm in this band</button> :
		        <button onClick={addBandToShow.bind(null, band.id)}>Add to Show</button>}
	        </li><br />
        </div>
    )
  })


	return (
		<div>
			{bandList}
		</div>
	)
}

export default BandSearchResults