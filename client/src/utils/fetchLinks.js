import axios from 'axios';
const fetchLinks = async () => {
	console.log('a');
	try {
		const res = await axios.get('/api/links');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export default fetchLinks;
