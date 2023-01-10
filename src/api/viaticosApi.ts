import axios from 'axios';

 const viaticosApi = axios.create({
    baseURL: 'http://172.31.74.243:7280/viaticos',
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json; charset=utf-8",
    },
});




export default viaticosApi;