import axios from 'axios';

 const viaticosApi = axios.create({
    baseURL: 'http://localhost:5250/api-viaticos',
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json; charset=utf-8",
    },
});




export default viaticosApi;

//http://localhost:5250 //local
//http://200.56.97.7:7281 //porfuera