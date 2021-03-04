import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Suggestions = ({ linkShown, setQuery, isFocus }) => {
	return (
		<SuggestionsContainer isFocus={isFocus}>
			{linkShown.map((link) => (
				<SuggestionBox
					onClick={(e) => {
						setQuery(link.text);
						window.open(link.url, '_blank');
					}}
					key={uuidv4()}
				>
					{link.text}
				</SuggestionBox>
			))}
		</SuggestionsContainer>
	);
};

const SuggestionsContainer = styled.div`
	display: ${(p) => (p.isFocus ? 'inline-block' : 'none')};
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	font-size: 1.1rem;
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	&::-webkit-scrollbar-thumb {
		background: #9e9e9e;
	}
	&::-webkit-scrollbar-thumb:hover {
		background: #878787;
	}
`;
const SuggestionBox = styled.div`
	width: 100%;
	padding: 0.5rem;
`;
export default Suggestions;
