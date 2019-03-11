import React from 'react'

const BandSelect = ({bands, setBand, band_id, band_name}) => {
	console.log(bands);

  let bandList = bands.map((band) => {
    return (
        <option key={band.band_id} value={[band.band_id, band.band_name]}>{band.band_name}</option>
    )
  })


	return(
		<div>
			<h2>Select Band</h2>

			<select onChange={setBand.bind(null)}>
				<option value={[null, '']}>No Band</option>
				{bandList}
			</select>
			<button>Select</button>

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