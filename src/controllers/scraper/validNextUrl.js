const validNextUrl = (nextUrl) => {
	if (!nextUrl) return false;
	if (nextUrl.includes('javascript')) return false;
	return true;
};
module.exports = validNextUrl;
