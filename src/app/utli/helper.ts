/* eslint-disable @typescript-eslint/prefer-for-of */
export class Helper {
  static checkDate(date: string): boolean {
      let valid=false;
      const dateParts=date.split('-');
      const validParts=[
        [2000,2100,4],
        [1,12,2],
        [1,32,2]
      ];
      for (let index = 0; index < dateParts.length; index++) {
        const datePart = dateParts[index];
        const validPart=validParts[index];
        if(datePart.length!==validPart[2]){
          valid=false;
          break;
        }
        const datePartNum=parseInt(datePart,10);
        if(isNaN(datePartNum)){
          valid=false;
          break;
        }
        if(datePartNum<validPart[0] || datePartNum>validPart[1]){
          valid=false;
          break;
        }
        console.log(datePart,datePartNum,validPart);
        valid=true;
      }

      return valid;
  }
  static dateINT(date: string): number{

    return parseInt(date.split('-').join(""),10);
  }
};
