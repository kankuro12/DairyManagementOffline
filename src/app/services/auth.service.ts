/* eslint-disable eqeqeq */
import { ApiService } from './api.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import md5  from "crypto-js/md5";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  loading=false;
  userLoading=true;
  token='';
  redirect='profile';
  loginMode = 1;

  authstart: EventEmitter<any>=new EventEmitter<any>();
  authprogress: EventEmitter<any>=new EventEmitter<any>();
  authend: EventEmitter<any>=new EventEmitter<any>();
  private logged=false;
  constructor(private api: ApiService,private router: Router) {
  }

  login(phone,password){
    if(navigator.onLine){
      this.authstart.emit(null);
      this.loading=true;
      console.log({phone,password});
      this.api.post('login-remote',{phone,password})
      .subscribe((res: any)=>{
        console.log(res);
        this.user=res;
        const userData={
          name: this.user.name,
          phone: this.user.phone,
          password:md5(password).toString()
        };
        window.localStorage.setItem('_xcbitetra',JSON.stringify(userData));
        this.loading=false;
        this.logged=true;
        this.api.setHeader(res.token);
        this.authend.emit(true);

      },(err)=>{console.log(err);alert('Wrong phone or password');this.loading=false;});
    }else{
      const userSTR=window.localStorage.getItem('_xcbitetra');
      if(userSTR==null || userSTR==undefined){
        alert('Wrong phone or password');
      }else{
        const userData=JSON.parse(userSTR);
        const hash=md5(password).toString();
        if(userData.phone==phone && userData.password==hash ){
        this.logged=true;
        this.authend.emit(true);
        }else{
          alert('Wrong phone or password');

        }
      }
      this.loading=false;
    }
  }

  getAuthStatus(){
    return this.logged;
  }


}
