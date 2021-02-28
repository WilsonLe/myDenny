const necessaryLinkToGoAndFetch = (url, urlsHistory) => {
	let urlIsNecessary = false;
	let message = '';
	if (url.includes('http'))
		if (url.includes('denison'))
			if (!url.includes('logout'))
				if (!url.includes('google'))
					if (!url.includes('youtube'))
						if (!url.includes('facebook'))
							if (!url.includes('instagram'))
								if (!url.includes('twitter'))
									if (!url.includes('vems.denison.edu'))
										if (!urlsHistory.includes(url))
											urlIsNecessary = true;
										else message = 'have been there';
									else message = 'includes vems.denison.edu';
								else message = 'includes twitter';
							else message = 'includes instagram';
						else message = 'includes facebook';
					else message = 'includes youtube';
				else message = 'includes google';
			else message = 'includes logout';
		else message = 'does not include denison';
	else message = 'does not include http';
	return { urlIsNecessary, message };
};

module.exports = necessaryLinkToGoAndFetch;
