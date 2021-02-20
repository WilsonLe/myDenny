import axios from 'axios';
const fetchLinks = async () => {
	try {
		const res = await axios.get('/api/links');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export default fetchLinks;
