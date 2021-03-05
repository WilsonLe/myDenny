import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Suggestions = ({ linkShown, setQuery }) => {
	const handleClickLink = async (e, link) => {
		setQuery(link.text);
		window.open(link.url, '_blank');
		try {
			const res = await axios.post('/api/links/click', { url: link.url });
			if (res.status === 200) return;
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<SuggestionsContainer>
			{linkShown.map((link) => (
				<SuggestionBox
					onClick={(e) => handleClickLink(e, link)}
					key={link._id}
				>
					{link.text}
				</SuggestionBox>
			))}
		</SuggestionsContainer>
	);
};

const SuggestionsContainer = styled.div`
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
	border-top: 1px dashed black;
	width: 100%;
	padding: 0.5rem;
	background-color: #ffffff;
	transition: all 0.15s ease;
	&:hover {
		transition: all 0.15s ease;
		background-color: #eeeeee;
	}
`;
export default Suggestions;
