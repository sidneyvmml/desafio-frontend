import axios from 'axios';
const KEY = 'AIzaSyAAcQZH4GYe0tyHRbWjqlREdbxSPHdB6W8';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY
    }
})