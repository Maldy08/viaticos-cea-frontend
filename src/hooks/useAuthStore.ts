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
            console.log( { data })
            dispatch( onLogin( { user: data, token: data.token }) )
            

        } catch (error) {

            console.log({ error });
        }
        
    }

    const startLogOut = () => {
        dispatch( onLogout({ user: {} }) );
    }

    return {
        //*Propiedades
        errorMessage,
        status,
        user,
        startLogin,
        startLogOut,
    }
}