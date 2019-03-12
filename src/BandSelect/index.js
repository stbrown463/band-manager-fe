import React from 'react'
import BandAdd from '../BandAdd'
import BandSearch from '../BandSearch'

const BandSelect = ({bands, setBand, band_id, band_name, goHome, user_id, getBandsOfUser}) => {
	console.log(bands);

  const bandList = bands.map((band) => {
    return (
        <option key={band.band_id} value={[band.band_id, band.band_name]}>{band.band_name}</option>
    )
  })


	return(
		<div>
			<h2>Select Band</h2>
			<select onChange={setBand.bind(null)}>
				<option value={[null]}>No Band</option>
				{bandList}
			</select>
			<button onClick={goHome.bind(null)}>Select</button>
			<BandSearch user_id={user_id}/>
			<BandAdd user_id={user_id}
			getBandsOfUser={getBandsOfUser}/>
		</div>
	)
}

export default BandSelect

// <select onChange={(e) => this.setState({ value: e.target.value })}>
//     <option value="PNG">PNG Image</option>
//     <option value="JPEG">JPEG Image</option>
//     <option value="PDF">PDF Document</option>
//     <option value="SVG">SVG Vector Image</option>
//  </select>