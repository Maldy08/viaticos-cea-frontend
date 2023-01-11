
import { useAuthStore } from "./useAuthStore"


export const useCheckAuth = () =>{
    const { status } = useAuthStore();

    return status;

}