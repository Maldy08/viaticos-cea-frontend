import { useSelector, useDispatch } from "react-redux"
import { viaticosApi } from "../api";
import { onCheking, onLogin, onLogout } from "../store/auth/authSlice";
import { RootState } from '../store/store';
import { User } from "../interfaces/interfaces";

export const useAuthStore = () => {
    const { status , user , errorMessage } = useSelector( ( state: RootState ) => state.auth);
    const dispatch = useDispatch();

    type Response = {
        data: User;
        token:string;
    }

    const startLogin = async ( login: string, pass: string ) => {
        dispatch( onCheking() );
        try {
            const { data } = await viaticosApi.post<Response>(`/Auth/login?user=${ login }&password=${ pass }`);
            //const { data } = await viaticosApi.post(`/Auth/login?user=${ login }&password=${ pass }`);
           // console.log( { data })
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch( onLogin( { user: data, token: data.token }) )
            

        } catch (error) {

            console.log({ error });
        }
        
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout({ user: {} }) );

        try {
            
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout({ user: { } }))
        }
    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch( onLogout({ user: {} }) );
    }

    const checkAuthentication =  async() => {
        const token = localStorage.getItem('token');
        
    }

    return {
        //*Propiedades
        errorMessage,
        status,
        user,
        startLogin,
        startLogOut,
        checkAuthToken,
    }
}