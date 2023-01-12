import { useSelector, useDispatch } from "react-redux"
import { viaticosApi } from "../api";
import { onCheking, onLogin, onLogout } from "../store/auth/authSlice";
import { RootState } from '../store/store';

export const useAuthStore = () => {
    const { status , user , errorMessage } = useSelector( ( state: RootState ) => state.auth );
    const dispatch = useDispatch();

    type Response = {
        token:string;
        ok:boolean;
        id:number;
        user:string;
    }

    const startLogin = async ( login: string, pass: string ) => {
        dispatch( onCheking() );
        try {
            const { data } = await viaticosApi.post(`/Auth/login?user=${ login }&password=${ pass }`);
            //const { data } = await viaticosApi.post(`/Auth/login?user=${ login }&password=${ pass }`);
           // console.log( { data })
            localStorage.setItem('token', data.token );
            // localStorage.setItem('id', Number.toString(data.id));
            //localStorage.setItem('user',data.user);
            //localStorage.setItem('token-init-date', new Date().getTime().toString());
            //localStorage.setitem('data',JSON.stringify(data.token,data.id,data.ok,data.user));
            localStorage.setItem("data", JSON.stringify(data));
            dispatch( onLogin( { user: data } ) )
            

        } catch (error) {

            console.log({ error });
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
            dispatch( onLogout({ user: { } }))
        }
    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch( onLogout({ user: { } }));
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