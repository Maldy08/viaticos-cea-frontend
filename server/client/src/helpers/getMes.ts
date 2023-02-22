export const getMes = ( fecha:Date ):string =>{
    const mes = fecha.getMonth() + 1;
    let mesString:string = "";

     switch ( mes ) {
      case 1:
        mesString="ENERO"    
        break;
      case 2:
        mesString="FEBRERO"
        break;
      case 3:
        mesString="MARZO"
        break;
      case 4:
          mesString="ABRIL"
          break;
      case 5:
          mesString="MAYO"
          break;
      case 6:
          mesString="JUNIO"
          break;
      case 7:
          mesString="JULIO"
          break;
      case 8:
          mesString="AGOSTO"
          break;
      case 9:
          mesString="SEPTIEMBRE"
          break;
      case 10:
          mesString="OCTUBRE"
          break;
      case 11:
          mesString="NOVIEMBRE"
          break;
      case 12:
          mesString="DICIEMBRE"
          break;

     }

    return mesString;
}