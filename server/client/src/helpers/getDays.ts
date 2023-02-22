
  export const getDays = ( fecha1:Date, fecha2:Date ): number => {
    
    const days = fecha2.getTime() - fecha1.getTime()
    const difference = Math.round(days / (1000 * 3600 * 24));
    
    return difference + 1;
  
  }
