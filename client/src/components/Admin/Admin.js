import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import AdminAuthorized from './AdminAuthorized';

import Map from './Map';

const Admin = () => {
	const [token, setToken] = useState();

	return (
		<React.Fragment>
			{token ? (
				<AdminAuthorized token={token}></AdminAuthorized>
			) : (
				<Login setToken={setToken} />
			)}
			{/* <Map /> */}
		</React.Fragment>
	);
};

export default Admin;
