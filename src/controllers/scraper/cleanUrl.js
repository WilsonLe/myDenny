const cleanUrl = (nextUrl) => {
	if (nextUrl.search('#') != -1)
		nextUrl = nextUrl.substring(0, nextUrl.search('#'));
	// FIXME add "- 1" after search
	if (nextUrl.endsWith('/'))
		nextUrl = nextUrl.substring(0, nextUrl.length - 1);

	return nextUrl;
};
module.exports = cleanUrl;
