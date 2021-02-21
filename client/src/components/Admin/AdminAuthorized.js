import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ScraperActivator from './ScraperActivator';

const AdminAuthorized = ({ token }) => {
	const [tokenState, setTokenState] = useState('await');
	const [data, setData] = useState([]);
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
		console.log(data);
		return <ScraperActivator token={token} />;
	}
	//FIXME insert admin tools
	else return <Redirect to="/" />;
};

export default AdminAuthorized;
