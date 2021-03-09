import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Mapper = ({ token, setMapData, setHasMapData }) => {
	const [mapState, setMapState] = useState(0);
	const activateMapper = async (e) => {
		setMapState(1);
		try {
			const res = await axios.post(
				'/api/map',
				{},
				{
					headers: { authorization: token },
				}
			);
			setMapState(0);
			console.log(res.data);
			setMapData(res.data);
			setHasMapData(true);
		} catch (e) {
			alert(e.response.data.msg);
		}
	};

	if (mapState === 0)
		return <Button onClick={activateMapper}>Activate Mapper</Button>;
	else if (mapState === 1)
		return <Button disabled>Mapper activated...</Button>;
};
const Button = styled.button`
	font-size: 1.1rem;
	padding: 0.5rem;
`;
export default Mapper;
