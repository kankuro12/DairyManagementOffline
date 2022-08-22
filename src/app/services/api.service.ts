import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base="";
  constructor(private client:  HttpClient) { }
  get(part){
    return this.client.get('base'+part);
  }
  post(part,data){
    return this.client.post('base'+part,data);
  }

}
