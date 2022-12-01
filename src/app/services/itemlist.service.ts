/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ItemlistService {
  items: string[]=[];
  searchItems: string[]=[];
  private _key= '_xcbitems';

  constructor() {
    const itemStr=localStorage.getItem(this._key);
    if(itemStr!=null){
      this.items=JSON.parse(itemStr);
    }else{
      localStorage.setItem(this._key,'[]');
    }

    this.searchItems=this.items;
  }

  add(itemName){
    if(!(this.items.includes(itemName))){
      this.items.push(itemName);
      localStorage.setItem(this._key,JSON.stringify(this.items));
    }
  }

   search(keyword){
    return new Promise((resolve,reject)=>{
      this.searchItems=this.items.filter(o=>o.toLowerCase().startsWith(keyword.toLowerCase()));
      resolve({});
    });
  }


  async clearSearch(){
    return new Promise((resolve,reject)=>{
      this.searchItems=this.items;
      resolve({});
    });
  }


}
