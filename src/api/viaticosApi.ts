import axios from 'axios';

 const viaticosApi = axios.create({
     //baseURL: 'http://localhost:5250/api-viaticos',
    // baseURL: 'http://172.31.74.243:7281/api-viaticos',
    //baseURL:'http://200.56.97.7:7281/api-viaticos',
    baseURL: 'http://localhost:5250/api-viaticos'
});

const viaticosApiUrl = 'http://localhost:5250/api-viaticos';


export {
     viaticosApi,
     viaticosApiUrl,
}

//http://localhost:5250 //local
//http://200.56.97.7:7281 //porfuera