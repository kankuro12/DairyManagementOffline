import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base="http://192.168.1.75:8000/api/";
  constructor(private client:  HttpClient) { }
  get(part){
    console.log(this.base+part);
    return this.client.get(this.base+part);
  }
  post(part,data){
    return this.client.post(this.base+part,data);
  }

}
