import { HttpClient } from '@angular/common/http';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Subscription } from 'rxjs';

/* eslint-disable eqeqeq */
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { type } from 'os';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // phone= '9816985816';
  // password= '9816985816';

  saveLogin = false;
  phone = '';
  password = '';
  private backButtonSubscription: Subscription;

  constructor(public auth: AuthService, private router: Router,
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    public setting: SettingsService,
    private client: HttpClient) {
    const saveLoginSTR = localStorage.getItem('_xcb_save_login');
    if (saveLoginSTR != null) {
      this.saveLogin = JSON.parse(saveLoginSTR);
    } else {
      localStorage.setItem('_xcb_save_login', this.saveLogin.toString());
    }

    if(this.saveLogin){
      this.phone=localStorage.getItem('_xcb_saved_phone')??"";
    }

  }

  ngOnInit() {
    this.auth.authend.subscribe((data) => {
      if(this.saveLogin){
        localStorage.setItem('_xcb_saved_phone', this.phone);
      }
      this.router.navigate(['/tabs/tab1'],{
        replaceUrl:true
      });
    });
  }

  login() {
    // if (this.phone.length < 10) {
    //   alert('Please enter phone no');
    //   return;
    // }

    if (this.password == undefined || this.password=="") {
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

  ionViewDidEnter() {
    this.backButtonSubscription=this.platform.backButton.subscribeWithPriority(10, (next) => {
        console.log(this.router.url);
        if(this.router.url=="/login"){
          if(confirm("Do you want to exit application")){
            App.exitApp();
          }
        }else{
          next();
        }
      }
    );
  }

  ionViewDidLeave() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

}
