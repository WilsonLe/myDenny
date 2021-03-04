import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Suggestions from './Suggestions';

const SearchBar = ({ query, setQuery, linkShown }) => {
	const xRef = useRef();

	const [isFocus, setIsFocus] = useState(false);
	const [xWidth, setXWidth] = useState(0);

	const handleXClick = () => {
		setQuery('');
	};
	const handleFocus = (e) => {
		setIsFocus(true);
	};
	const handleOutFocus = (e) => {
		setIsFocus(false);
	};

	useEffect(() => setXWidth(xRef.current.clientHeight), [xRef]);

	return (
		<SearchBarContainer>
			<div>
				<Input
					maxLength={60}
					value={query}
					placeholder={'Enter your search here...'}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={(e) => handleFocus(e)}
					onBlur={(e) => handleOutFocus(e)}
					xWidth={xWidth}
				/>
				<Button onClick={handleXClick} ref={xRef} xWidth={xWidth}>
					X
				</Button>
			</div>

			<Suggestions
				linkShown={linkShown}
				setQuery={setQuery}
				isFocus={isFocus}
			/>
		</SearchBarContainer>
	);
};

const SearchBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 60%;
	width: 50%;
`;

const Input = styled.input`
	font-size: 1.1rem;
	padding: 1.1rem;
	width: calc(100% - ${(p) => p.xWidth}px);
	height: 2.2rem;
	border: 0;
	margin: 0;
	&:focus {
		outline: none;
	}
`;

const Button = styled.button`
	height: 100%;
	font-size: 1.1rem;
	width: ${(p) => p.xWidth}px;
	padding: none;
	margin: none;
	border: none;
	outline: none;
	transition: all 0.15s ease;
	&:hover {
		cursor: pointer;
		background-color: #9e9e9e;
		transition: all 0.15s ease;
	}
`;

export default SearchBar;
