import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../SearchBar/SearchBar';

import fetchLinks from '../../utils/fetchLinks';

const MyDenny = () => {
	const mockLinks = [
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
		{ text: 'asdf' },
	];
	const [links, setLinks] = useState([]);
	const [query, setQuery] = useState('');
	const [linkShown, setLinkShown] = useState([]);

	useEffect(() => {
		(async () => {
			let links = await fetchLinks();
			if (links) setLinks(links);
			else setLinks(mockLinks);
		})();
	}, []);

	useEffect(() => filterSuggestions(), [query]);

	const filterSuggestions = () => {
		let linkTextRegex = new RegExp(query, 'i');
		if (query.length > 0) {
			let newLinks = [...links].filter((link) =>
				linkTextRegex.test(link.text)
			);
			setLinkShown(newLinks);
		} else if (query.length === 0) setLinkShown([]);
	};

	return (
		<DennyContainer>
			<SearchBar
				query={query}
				setQuery={setQuery}
				linkShown={linkShown}
			/>
		</DennyContainer>
	);
};

const DennyContainer = styled.div`
	width: 80%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export default MyDenny;
