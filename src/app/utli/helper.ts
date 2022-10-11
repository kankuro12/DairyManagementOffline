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
  static dateSTR(date: number): string{
    const year=parseInt((date/10000).toString(),10);
    date=date%10000;
    const month=parseInt((date/100).toString(),10);
    date=date%100;

    return year.toString()+"-"+(month>9?"":"0")+month.toString()+"-"+(date>9?"":"0")+date.toString();
  }

  static getSessionRange(year: number,month: number,session: number): number[]{
    return [
      year*10000+month*100+(session===1?1:16),
      year*10000+month*100+(session===1?15:32),
    ];
  }

  static makeIntegerSession(year,month,session){
    year=(typeof year)== 'number'?year:parseInt(year,10);
    month=(typeof month)== 'number'?month:parseInt(month,10);
    session=(typeof session)== 'number'?session:parseInt(session,10);
    return year*10000+month*100+session;
  }


  static isNumber(num) {
    return num !== undefined && num !== null && !isNaN(num);
  }

  static sum(array,obj) {
    return (array.length === 0) ? 0 : array[0][obj] + Helper.sum(array.slice(1),obj);
  }

  static toPromise(call){
    return new Promise((resolve,reject)=>{
      call.subscribe(val=>resolve(val),(err)=>reject(err));
    });
  }
}
