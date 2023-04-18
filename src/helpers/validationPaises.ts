import { useCiudadesStore } from "../hooks";

export const validationPaises =  ( idciudad:number )  =>  {

    const { isLoading, ciudad, startLoadingCiudadById } = useCiudadesStore();

     console.log('validationPaisesLoading');
    // await startLoadingCiudadById(idciudad);
     //const idEstado = isLoading! ? ciudad.idEstado : 0 ;
     //console.log(`validationPaisesEnd: ${ idEstado }`);
     


     //return  isLoading! ? ciudad.idCiudad : 0;
     return 0;

}