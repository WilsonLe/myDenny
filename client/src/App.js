import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Admin from './components/Admin/Admin';
import MyDenny from './components/MyDenny/MyDenny';

const App = () => {
	return (
		<Router>
			<GlobalStyle />
			<AppContainer>
				<Switch>
					<Route exact path={'/admin'} component={Admin} />
					<Route exact path={'/'} component={MyDenny} />
				</Switch>
			</AppContainer>
		</Router>
	);
};

const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	body {
		font-family: "Roboto", sans-serif;
		overflow: hidden;
	}
`;

const AppContainer = styled.div`
	display: fixed;
	width: 100vw;
	height: 100vh;
	background-color: #c8032b;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default App;
