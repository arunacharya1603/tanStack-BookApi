import axios from 'axios';

const fetchUser = async ({ page = 0, query = "default",year = "" }) => {
    const maxResults = 10; // Number of results per page
    const startIndex = page * maxResults; 
    const yearFilter = year ? `+publishedDate:${year}` : "";

    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}${yearFilter}&startIndex=${startIndex}&maxResults=${maxResults}&key=${import.meta.env.VITE_API_URL}`;

    try {
        const response = await axios.get(API_URL);
        const items = response.data.items || [];
        const hasMore = response.data.totalItems > startIndex + maxResults; 
        const categories = items.map(item => item.volumeInfo.categories || []);
        console.log(categories.flat());

        return { items, hasMore, categories }; 
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }



};

export default fetchUser;