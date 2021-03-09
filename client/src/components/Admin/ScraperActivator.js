import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ScraperActivator = ({ token }) => {
	const [scrapeState, setScrapeState] = useState(0);
	const activateScraper = async (e) => {
		setScrapeState(1);
		try {
			const res = await axios.post(
				'/api/scrape',
				{},
				{
					headers: { authorization: token },
				}
			);
			if (res.status === 200) setScrapeState(0);
		} catch (e) {
			alert(e.response.data.msg);
		}
	};
	if (scrapeState === 0)
		return <Button onClick={activateScraper}>Activate Scraper</Button>;
	else if (scrapeState === 1)
		return <Button disabled>Scraper activated...</Button>;
};
const Button = styled.button`
	font-size: 1.1rem;
	padding: 0.5rem;
`;
export default ScraperActivator;
