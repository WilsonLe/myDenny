const handleParser = async (linkHandle, page) => {
	// extract text from link handle
	const text = await page.evaluate((el) => el.textContent, linkHandle);

	// extract url from link handle
	const nextUrl = await page.evaluate((el) => el.href, linkHandle);

	return { nextUrl, text };
};
module.exports = handleParser;
