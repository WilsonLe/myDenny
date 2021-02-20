import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import SearchBar from './components/SearchBar/SearchBar';

import fetchLinks from './utils/fetchLinks';

const App = () => {
	const [links, setLinks] = useState([]);
	const [query, setQuery] = useState('');
	const [linkShown, setLinkShown] = useState([]);

	useEffect(() => {
		(async () => {
			let links = await fetchLinks();
			setLinks(links);
			setLinkShown([...links]);
		})();
	}, []);

	useEffect(() => {
		filterDishes();
	}, [query]);

	const filterDishes = () => {
		let linkTextRegex = new RegExp(query, 'i');
		if (query.length > 0) {
			let newLinks = [...links].filter((link) =>
				linkTextRegex.test(link.text)
			);
			setLinkShown(newLinks);
		} else if (query.length === 0) {
			setLinkShown([...links]);
		}
	};

	return (
		<React.Fragment>
			<GlobalStyle />
			<SearchBar
				query={query}
				setQuery={setQuery}
				linkShown={linkShown}
			/>
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
