import { HttpClient } from '@angular/common/http';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

/* eslint-disable eqeqeq */
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { type } from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  phone= '9852078275';
  password= '9852078275';

  saveLogin = false;
  // phone = '';
  // password = '';

  constructor(public auth: AuthService, private router: Router,
    private barcodeScanner: BarcodeScanner,
    public setting: SettingsService,
    private client: HttpClient) {
    const saveLoginSTR = localStorage.getItem('_xcb_save_login');
    if (saveLoginSTR != null) {
      this.saveLogin = JSON.parse(saveLoginSTR);
    } else {
      localStorage.setItem('_xcb_save_login', this.saveLogin.toString());
    }

    // this.phone=localStorage.getItem('_xcbphone')??'';
  }

  ngOnInit() {
    this.auth.authend.subscribe((data) => {
      // this.password = '';
      this.router.navigate(['/tabs/tab1']);
    });
  }

  login() {
    // if (this.phone.length < 10) {
    //   alert('Please enter phone no');
    //   return;
    // }
    if(this.saveLogin){
      this.auth.login(this.phone.toString(), this.phone.toString());
      return;
    }
    if (this.password == undefined) {
      alert('Please enter password');
      return;
    }
    this.auth.login(this.phone.toString(), this.password);
  }

  link() {
    this.barcodeScanner.scan().then(barcodeData => {
      const data = JSON.parse(barcodeData.text);
      const pin = prompt('Please enter connection pin');
      this.client.post(data.url + 'barcode-setup', { pin, token: data.token })
        .subscribe((res: any) => {
          if (res.status) {
            this.setting.url = data.url;
            this.setting.setup = true;
            localStorage.setItem('url', data.url);
          } else {
            alert(res.message);
          }
        });
    }).catch(err => {
      console.log('Error', err);
    });
  }


  changeSaveLogin(e){
    this.saveLogin=e.target.checked;
    localStorage.setItem('_xcb_save_login', this.saveLogin.toString());

  }
}
