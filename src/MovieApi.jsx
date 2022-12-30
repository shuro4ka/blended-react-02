import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const KEY = '7512b89e15142b7eebf8961a74e5681a';


export const fetchMovies = (page) => {
    return axios('trending/all/day', {params:{api_key: KEY, page}})
   
}