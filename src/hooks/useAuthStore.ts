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

    const startLogin = async ( login: string, pass: string, ejercicio:number ) => {
        dispatch( onCheking() );
        
        try {
            const { data } = await viaticosApi.post(`api/Auth/login?user=${ login }&password=${ pass }`);
 
            localStorage.setItem('ejercicio',ejercicio.toString());
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
           const { data } = await viaticosApi.get<Response>(`api/Auth/validate-token?token=${ token }`);
           dispatch( onLogin( { user: data }) )
            
        } catch (error) {
            localStorage.clear();
            console.log({ error });
            dispatch( onLogout({ user: { } }));
        }
    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch( onCheking() );
        dispatch( onLogout({ user: { } }));
    }

    const startCheckingUserById = async ( id: number) => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout( { user: { }}) );
        try {
            const { data } = await viaticosApi.get<Response>(`api/Usuario/GetUserById?id=${ id }`);
            dispatch( onCheckUserById( { user: data } ) );
            
        } catch (error) {
            localStorage.clear();
            console.log({ error });
        }
    }

    const startUpdatePassword = async ( user : any, newpassword: string ) => {
       // console.log({ user, newpassword });
       // return;

        try {
            const { data } = await viaticosApi.put(`api/Auth/cambiopass?=user${ user }&newPassword=${ newpassword }`);
            console.log({ data });
            return data;
        } catch (error) {
            console.log({ error })
            
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
        startUpdatePassword,
    }
}