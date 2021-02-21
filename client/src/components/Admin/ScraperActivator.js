import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ScraperActivator = ({ token }) => {
	const [scrapeState, setScrapeState] = useState(0);
	const activateScraper = async (e) => {
		console.log(token);
		try {
			const res = await axios.post(
				'/api/scrape',
				{},
				{
					headers: { authorization: token },
				}
			);
			if (res.status === 200) setScrapeState(1);
		} catch (e) {
			alert(e.response.data.msg);
		}
	};
	if (scrapeState === 0)
		return <Button onClick={activateScraper}>Activate Scraper</Button>;
	else if (scrapeState === 1)
		return <Button disabled>Scraper activated...</Button>;
};
const Button = styled.button``;
export default ScraperActivator;
