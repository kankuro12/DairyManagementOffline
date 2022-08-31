import { SettingsService } from 'src/app/services/settings.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Settings } from "http2";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base="http://192.168.1.75:8000/api/";
  headers: HttpHeaders;
  constructor(private client:  HttpClient,private setting: SettingsService) {
    this.headers = new HttpHeaders()
    .append('accept', 'application/json');
   }

  setHeader(token){
    this.headers = new HttpHeaders();
    this.headers=this.headers.append('Authorization','Bearer '+token);
    this.headers=this.headers.append('accept', 'application/json');
  }



  get(part){
    console.log(this.base+part);
    return this.client.get(this.setting.url+part,{ headers: this.headers });
  }
  post(part,data){
    return this.client.post(this.setting.url+part,data,{ headers: this.headers });
  }

}
