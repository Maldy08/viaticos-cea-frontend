import axios from 'axios';

 const viaticosApi = axios.create({
   // baseURL: 'http://localhost:5250/api-viaticos',
    //baseURL: 'http://localhost:5178/',
  //  baseURL: 'http://localhost:5189/api',
    // baseURL: 'http://172.31.74.243:7281/api-viaticos',
    baseURL:'http://200.56.97.5:7281/',
   // baseURL: 'http://200.56.97.5:7281/api-viaticos'
});

const viaticosApiUrl = 'http://200.56.97.5:7281/';
//const viaticosApiUrl = 'http://localhost:5250/api-viaticos';
//const viaticosApiUrl = 'http://localhost:5178/';
//const viaticosApiUrl = 'http://localhost:5189/api';

export {
     viaticosApi,
     viaticosApiUrl,
}


//http://localhost:5250 //local
//http://200.56.97.7:7281 //porfuera