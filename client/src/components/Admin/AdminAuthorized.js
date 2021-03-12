import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ScraperActivator from './ScraperActivator';
import MapperActivator from './MapperActivator';
import Map from './Map';

import styled from 'styled-components';

const AdminAuthorized = ({ token }) => {
	const [tokenState, setTokenState] = useState('await');
	const [data, setData] = useState([]);
	const [mapData, setMapData] = useState({});
	const [hasMapData, setHasMapData] = useState(false);

	useEffect(() => {
		(async () => {
			if (token) {
				try {
					const res = await axios.get('/api/auth/links', {
						headers: { authorization: token },
					});
					if (res.status === 200) {
						setTokenState('valid');
						setData(res.data);
					}
				} catch (e) {
					alert(e.response.data.msg);
					setTokenState('invalid');
				}
			}
		})();
	}, []);

	if (tokenState === 'await') return null;
	else if (tokenState === 'invalid') return <Redirect to="/" />;
	else if (tokenState === 'valid') {
		return (
			<Container>
				<ScraperActivator token={token} />
				<br />
				<MapperActivator
					token={token}
					setHasMapData={setHasMapData}
					setMapData={setMapData}
				/>
				<br />
				{hasMapData ? <Map mapData={mapData} /> : null}
			</Container>
		);
	}
	//FIXME insert admin tools
	else return <Redirect to="/" />;
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default AdminAuthorized;
