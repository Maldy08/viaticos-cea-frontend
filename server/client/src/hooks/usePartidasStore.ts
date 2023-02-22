import { useDispatch, useSelector } from "react-redux"
import { viaticosApi } from "../api";
import { ViaticosPart } from "../interfaces/interfaces";
import { onAddNew } from "../store/partidas/partidasSlice";
import { RootState } from "../store/store"


export const usePartidasStore = () => {

    const { isLoading, partidas } = useSelector( ( state: RootState ) => state.partidas );
    const dispatch = useDispatch();

    const startAddNewPartidas = async( partidas: ViaticosPart ) => {

        try {

            const { data } = await viaticosApi.post(`/ViaticosPart`, partidas );
            dispatch( onAddNew( data ) );

        } catch ( error:any ) {
            
            console.log( error );
            throw new Error('Error al guardar partidas de viaticos');
        }

    }

    return {
        isLoading,
        partidas,
        startAddNewPartidas,
    }
}