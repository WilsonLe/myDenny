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
	const [isFocus, setIsFocus] = useState(false);
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

	const handleClickOutside = (e) => {
		const classNames = e.target.className;
		if (classNames.includes('container')) setIsFocus(false);
		else setIsFocus(true);
	};

	return (
		<DennyContainer
			onClick={(e) => handleClickOutside(e)}
			className={'container'}
		>
			<SearchBar
				query={query}
				setQuery={setQuery}
				linkShown={linkShown}
				isFocus={isFocus}
				setIsFocus={setIsFocus}
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
