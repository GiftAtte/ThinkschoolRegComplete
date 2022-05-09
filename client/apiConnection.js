import Axios from 'axios'
export const BASE_URL = "http://localhost:9000/api/v1/";

 
export const URL = Axios.create({
    baseURL: BASE_URL
});

