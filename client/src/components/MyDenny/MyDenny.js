import React, { useState, useEffect } from 'react';

import SearchBar from '../SearchBar/SearchBar';

import fetchLinks from '../../utils/fetchLinks';

const MyDenny = () => {
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
		filterSuggestions();
	}, [query]);

	const filterSuggestions = () => {
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
		<SearchBar query={query} setQuery={setQuery} linkShown={linkShown} />
	);
};

export default MyDenny;
