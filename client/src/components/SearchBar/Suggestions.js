import React from 'react';
import styled from 'styled-components';

const Suggestions = ({ linkShown, setQuery }) => {
	return (
		<SuggestionsContainer>
			{linkShown.map((link) => (
				<SuggestionBox onClick={() => setQuery(link.text)}>
					{link.text}
				</SuggestionBox>
			))}
		</SuggestionsContainer>
	);
};

const SuggestionsContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const SuggestionBox = styled.div`
	width: 100%;
	height: 45px;
`;
export default Suggestions;
