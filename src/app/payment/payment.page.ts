/* eslint-disable eqeqeq */
import { SnfFat } from './../database/models/snffat.modal';
import { ActionSheetController } from '@ionic/angular';
import { Farmer } from 'src/app/database/models/farmer.modal';
import { SqlliteService } from 'src/app/services/sqllite.service';
import { FarmerPayment } from './../database/models/farmerpayment.modal';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @ViewChild('addPayment') addPayment: AddPaymentComponent;
  type=1;
  loaded=false;
  isEditing=false;
  amount=0;
  payment: FarmerPayment;
  localID=0;
  constructor(private db: SqlliteService,private actionSheetController: ActionSheetController) { }

  ngOnInit() {

  }

  resetData(){

    this.addPayment.reset();
    this.loaded=false;
  }



  filter(data: any[]){
    return data.filter(o=>o.type===this.type);
  }

  async initAction(id) {
    this.localID=id;
    this.payment = await this.db.selectONE(FarmerPayment, "select * from farmerpayments where id=?", [id]);
    this.actionSheetController.create({
      header: 'Payment',
      buttons: [
        {
          text: 'Edit',
          role: 'save',
          icon: 'trash',
          id: 'edit-button',
          handler: () => {
            this.isEditing=true;
            this.amount=this.payment.amount;
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'create',
          id: 'delete-button',
          handler: () => {
            if(confirm('Do you want to delete payment data?')){
              this.payment.del()
              .then((s)=>{
                const index=this.addPayment.payments.findIndex(o=>o.id==this.localID);
                this.addPayment.payments.splice(index,1);
              })
              .catch((err)=>{

              });
            }

          }
        }
      ]
    }).then((action) => action.present());

  }

  updateData(){
    if(this.amount != undefined && this.amount != null ){

      if(confirm('Do you want to update payment data')){
        this.payment.amount=this.amount;
        this.payment.save()
        .then((s: FarmerPayment)=>{
          const index= this.addPayment.payments.findIndex(o=>o.id==this.payment.id);
          const localFarmer= this.addPayment.farmers.find(o=>o.id==this.payment.user_id);
          this.isEditing=false;
          this.amount=null;
          this.addPayment.payments[index]={...this.payment,no:localFarmer.no,name:localFarmer.name};
        });

      }
    }else{
      alert('Please enter all data');
    }

  }
}
