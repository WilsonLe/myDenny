import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Title = () => {
	return (
		<TitleContainer>
			<H1>My Denny</H1>
			<Info>
				<FontAwesomeIcon icon={faInfoCircle} />
			</Info>
		</TitleContainer>
	);
};

const TitleContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const H1 = styled.h1`
	color: white;
	margin: 0 1rem 2rem 1rem;
`;
const Info = styled.div`
	color: white;
	display: inline-block;
`;
export default Title;
