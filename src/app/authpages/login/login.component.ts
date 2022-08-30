import { Router } from '@angular/router';
/* eslint-disable eqeqeq */
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  phone: string;
  password: string;
  constructor(public auth: AuthService,private router: Router) { }

  ngOnInit() {
    this.auth.authend.subscribe((data)=>{
      this.password='';
      this.router.navigate(['/tabs/tab1']);

    });
  }

  login(){
    if(this.phone==undefined || this.phone.length<10){
      alert('Please enter phone no');
      return;
    }
    if(this.password==undefined || this.password.length<10){
      alert('Please enter phone no');
      return;
    }
    this.auth.login(this.phone,this.password);
  }

}
