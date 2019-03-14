import React from 'react'
import BandAdd from '../BandAdd'
import BandSearch from '../BandSearch'

const BandSelect = ({bands, setBand, band_id, band_name, goHome, user_id, getBandsOfUser}) => {
	// console.log(bands);

  const bandList = bands.map((band) => {
    return (
        <option key={band.band_id} value={[band.band_id, band.band_name]}>{band.band_name}</option>
    )
  })


	return(
		<div>
			<h1>Select Band</h1>
			<select onChange={setBand.bind(null)}>
				<option value={[null]}>No Band</option>
				{bandList}
			</select>
			<button onClick={goHome.bind(null)}>Select</button>
			<BandSearch 
				user_id={user_id}
				addBandToShow={false}/>
			<BandAdd user_id={user_id}
			getBandsOfUser={getBandsOfUser}/>
		</div>
	)
}

export default BandSelect
