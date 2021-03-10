const checkLogin = async (page) => {
	const usernameInput = await page.$('#username');
	const passwordInput = await page.$('#password');
	if (usernameInput && passwordInput) return true;
	else return false;
};
module.exports = checkLogin;
