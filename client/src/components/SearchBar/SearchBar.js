import React from 'react';
import styled from 'styled-components';

import Suggestions from './Suggestions';

const SearchBar = ({ query, setQuery, linkShown }) => {
	console.log(linkShown);
	const handleXClick = () => {
		setQuery('');
	};
	return (
		<SearchBarContainer>
			<div>
				<Input
					maxLength={60}
					value={query}
					placeholder={'Enter your search here...'}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button onClick={handleXClick}>X</Button>
			</div>
			<Suggestions linkShown={linkShown} setQuery={setQuery} />
		</SearchBarContainer>
	);
};

const SearchBarContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const Input = styled.input``;
const Button = styled.button``;

export default SearchBar;
