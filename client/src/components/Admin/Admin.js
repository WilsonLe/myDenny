import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import AdminAuthorized from './AdminAuthorized';

const Admin = () => {
	const [token, setToken] = useState();

	return (
		<React.Fragment>
			{token ? (
				<AdminAuthorized token={token}></AdminAuthorized>
			) : (
				<Login setToken={setToken} />
			)}
		</React.Fragment>
	);
};

export default Admin;
