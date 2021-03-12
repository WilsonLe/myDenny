import React from 'react';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink';
import NOverlap from 'react-sigma/lib/NOverlap';

const Map = ({ mapData }) => {
	const mapData = JSON.parse(localStorage.getItem('mapData'));
	return (
		<Sigma
			renderer="svg"
			style={{ width: '1000px', height: '1000px' }}
			graph={mapData}
			settings={{ drawEdges: true, clone: false }}
		>
			<RelativeSize initialSize={15} />
			<RandomizeNodePositions />
			{/* <NOverlap gridSize={10} maxIterations={100} /> */}
			<ForceLink background easing="cubicInOut" />
		</Sigma>
	);
};
export default Map;
