import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import fetchLinks from './utils/fetchLinks';

const App = () => {
	// const [links, setLinks] = useState(
	// 	JSON.parse(localStorage.getItem('links')) || fetchLinks()
	// );
	fetchLinks().then((links) => console.log(links));
	return (
		<React.Fragment>
			<GlobalStyle />
			Hello world
		</React.Fragment>
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
		overflow: scroll;
	}
`;

export default App;
