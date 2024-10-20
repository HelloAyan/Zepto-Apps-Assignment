import axios from "axios";


const API_URL = 'https://gutendex.com/books';
export const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL, {
            timeout: 100000,
        });
        return response.data;
    } catch (error) {
        console.error('Error Fetching books: ', error);
        throw error;
    }
}
