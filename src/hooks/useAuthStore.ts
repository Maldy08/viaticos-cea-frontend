import { useSelector, useDispatch } from "react-redux"
import { viaticosApi } from "../api";
import { onCheckUserById, onCheking, onAuthError, onLogin, onLogout } from "../store/auth/authSlice";
import { RootState } from '../store/store';

export const useAuthStore = () => {
    const { status , user , errorMessage } = useSelector( ( state: RootState ) => state.auth );
    const dispatch = useDispatch();

    type Response = {
        token:string;
        ok:boolean;
        id:number;
        user:string;
        userData:{ }
    }

    const startLogin = async ( login: string, pass: string ) => {
        dispatch( onCheking() );
        try {
            const { data } = await viaticosApi.post(`/Auth/login?user=${ login }&password=${ pass }`);

            localStorage.setItem('token', data.token );
            localStorage.setItem("data", JSON.stringify(data));
            dispatch( onLogin( { user: data } ) )

        } catch (error) {
            console.log({ error });
            dispatch( onAuthError() );
           // dispatch( onError( { error }) );
        }
        
    }

    const checkAuthToken = async() => {
       
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout({ user: { } }) );
        dispatch( onCheking() );
        try {
           const { data } = await viaticosApi.get<Response>(`/Auth/validate-token?token=${ token }`);
           dispatch( onLogin( { user: data }) )
            
        } catch (error) {
            localStorage.clear();
            console.log({ error });
            dispatch( onLogout({ user: { } }));
        }
    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch( onLogout({ user: { } }));
    }

    const startCheckingUserById = async ( id: number) => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout( { user: { }}) );
        try {
            const { data } = await viaticosApi.get<Response>(`/Auth/usuarioById?id=${ id }`);
            dispatch( onCheckUserById( { user: data } ) );
            
        } catch (error) {
            localStorage.clear();
            console.log({ error });
        }
    }

    return {
        //*Propiedades
        errorMessage,
        status,
        user,
        startLogin,
        startLogOut,
        checkAuthToken,
        startCheckingUserById,
    }
}