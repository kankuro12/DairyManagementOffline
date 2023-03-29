import { ExtraItemModal } from './../database/models/extraitem.modal';
import { ExtraItemService } from './../services/extraitem.service';
import { ExtraItem } from './../database/structure/extraItem';
import { rates } from './../database/structure/rates';
import { RatesService } from './../services/rates.services';
import { CustomerBalance } from './../database/structure/customer.balance.data';
import { CustomerService } from './../services/customer.service';
import { parse } from 'querystring';
import { Area, AreaRate } from './../database/structure/area.data';
import { AreaDataService } from './../services/area.data.services';
/* eslint-disable max-len */
import { AuthService } from './../services/auth.service';
/* eslint-disable eqeqeq */
import { ChalanPayment } from './../database/models/chalanpayment';
import { ChalanSellItem } from './../database/models/chalansellitem';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { ApiService } from './../services/api.service';
import { ChalanItem } from './../database/models/chalanitem.modal';
import { Helper } from './../utli/helper';
import NepaliDate from "nepali-date";
import { Customer } from './../database/models/customer.modal';
import { SqlliteService } from './../services/sqllite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellitem',
  templateUrl: './sellitem.page.html',
  styleUrls: ['./sellitem.page.scss'],
})

export class SellitemPage implements OnInit {

  customers: Customer[] = [];
  date = '';
  curDate: number;
  items: ChalanItem[] = [];
  sellItems: ChalanSellItem[] = [];
  payments: ChalanPayment[] = [];
  loading = false;
  item_id: number;
  phone: string;
  selling = false;
  customerLoaded = false;
  total=0;

  //calculations
  rate: number;
  qty: number;
  amount: number;

  //tab
  sellingType = 1;

  //Extraitems
  extra_item_id: number = null;
  extra_item_in: number = null;
  extra_item_out: number = null;
  extraItems: ExtraItemModal[];
  //payment
  paymentAmount: number;
  //permission
  hasPermission= false;

  //customer
  addingCustomer=false;
  addName= '';
  addPhone= '';
  addAreaID= null;
  balance = 0;

  addLock=false;

  //search customer
  searchingCustomer= false;
  searchKeyword='';
  searchList: Customer[]=[];
  currentCustomer: Customer;

  //areaInfo
  areaRates: AreaRate[]=[];
  area: Area;
  rates: rates[]=[];

  constructor(private db: SqlliteService, private api: ApiService, public auth: AuthService,public areaData: AreaDataService,
    private ratesData: RatesService,
    public ExtraItemData: ExtraItemService,
    private CustomerManager: CustomerService) { }
  async ngOnInit() {
    this.hasPermission=this.auth.hasPermission(['15.06','15.07']);
    if(this.hasPermission){
      this.customers = await this.db.select(Customer, "select * from customers");
      const localDate = new Date();
      const d4 = new NepaliDate(localDate);
      this.date = d4.format('YYYY-MM-DD');
      this.curDate = Helper.dateINT(this.date);
      this.searchCustomer();
      this.CustomerManager.pull();

    }

  }


  showInterface() {
    this.selling = true;
  }

  async pullData() {
    this.api.post('employee-chalan', {
      date: this.date
    }).subscribe(async (res: any) => {

      if(res.status){
        const chalanItems=res.data;
        // this.CustomerManager.pull();
        for (let index = 0; index < chalanItems.length; index++) {
          const chalanItem = chalanItems[index];
          chalanItem.date = this.curDate;
          chalanItem.user_id = this.auth.user.id;
          const f = new ChalanItem(chalanItem);
          await f.save();

          this.items.push(f);
          this.showInterface();

        }
      }else{
        alert('No chalan found for date '+this.date);
      }
      this.loading = false;

    }, (err) => {
      this.loading = false;

    });
  }

  async loadData() {
    this.loading = true;
    this.items = await this.db.select(ChalanItem, "select * from chalanitems where date=? and user_id=?", [this.curDate, this.auth.user.id]);
    if (this.items.length === 0) {
      if (confirm(`There no chalan data for ${this.date}.Do you want to pull data.`)) {
        this.pullData();
      }
    } else {

      this.loading = false;
      this.showInterface();
    }
  }

  async loadCustomerData() {
    this.customerLoaded = false;
    this.currentCustomer=this.customers.find(o=>o.phone==this.phone);
    console.log(this.currentCustomer);
    this.sellItems = await this.db.select(ChalanSellItem, 'select * from chalansellitems where phone=? and date=? and user_id=?', [this.phone, this.curDate, this.auth.user.id]);
    this.payments = await this.db.select(ChalanPayment, 'select * from chalanpayments where phone=? and date=? and user_id=?', [this.phone, this.curDate, this.auth.user.id]);
    this.customerLoaded = true;
    this.resetItem();
    this.area=this.areaData.data.areas.find(o=>o.id==this.currentCustomer.area_id);
    this.areaRates=this.areaData.data.rates.filter(o=>o.area_id==this.currentCustomer.area_id);
    this.rates=this.ratesData.data.filter(o=>o.phone==this.currentCustomer.phone);
    const customerBalance=this.CustomerManager.data.find(o=>o.phone==this.currentCustomer.phone);
    if(customerBalance!=undefined){
      this.balance=customerBalance.dr-customerBalance.cr;
    }else{
      this.balance=0;
    }
    this.extraItems=await this.db.select(ExtraItemModal,"select * from extraitems  where phone=? and date=? and user_id=?",[this.phone, this.curDate, this.auth.user.id]);
    console.log(this.balance);
    this.calculateTotal();

  }
  loadItemData() {
    console.log(this.items, this.item_id);
    const item = this.items.find(o => o.item_id == this.item_id);
    const areaRate=this.areaRates.find(o=>o.item_id==this.item_id);
    const localRates=this.rates.find(o=>o.item_id==this.item_id);
    if(localRates!=undefined && localRates!=null){
      this.rate =parseFloat(localRates.rate );
    }else{
      if(areaRate!=undefined && areaRate!=null){
        this.rate =parseFloat( areaRate.sell_price);

      }else{

        this.rate = item.rate;
      }

    }

    this.qty = 1;
    this.calculate();
  }
  calculate() {
    this.amount = this.rate * this.qty;
  }

  delSellItem(id) {
    if (confirm("Do you want to delete sellitem")) {
      const index = this.sellItems.findIndex(o => o.id == id);
      if (index > -1) {
        const sellitem = this.sellItems[index];
        sellitem.del()
          .then(() => {
            this.sellItems.splice(index, 1);
            this.calculateTotal();

          });
      }
    }
  }


  save() {
    const item = this.items.find(o => o.item_id == this.item_id);

    const sellItem = new ChalanSellItem({
      date: this.curDate,
      phone: this.phone,
      item_id: this.item_id,
      qty: this.qty,
      rate: this.rate,
      title: item.title,
      user_id: this.auth.user.id,
      sync:0

    });
    sellItem.save()
      .then((i: ChalanSellItem) => {
        this.sellItems.push(i);
        this.calculateTotal();

        this.resetItem();
      });
  }

  resetItem() {
    this.item_id = null;
    this.rate = null;
    this.qty = null;
    this.amount = null;
  }

  savePayment() {
    console.log(this.paymentAmount);
    if (this.paymentAmount == undefined || this.paymentAmount == 0) {
      alert('Please enter payment amount');
      return;
    }

    const p = new ChalanPayment({
      amount: this.paymentAmount,
      phone: this.phone,
      user_id: this.auth.user.id,
      date: this.curDate,
      sync:0
    });
    p.save()
    .then((payment: ChalanPayment)=>{
      this.payments.push(payment);
      this.paymentAmount=null;
    });
  }
  delPayment(id){
    if(confirm('Do you want to delete payment')){
      const index=this.payments.findIndex(o=>o.id===id);
      if(index>-1){
        const payment=this.payments[index];
        payment.del()
        .then((res)=>{
          this.payments.splice(index,1);

        });

      }
    }
  }

  reset(){
    this.resetItem();
    this.amount=null;
    this.phone=null;
    this.selling=false;
    this.payments=[];
    this.sellItems=[];
    this.customerLoaded=false;
  }

  calculateTotal(){
    let tot=0;
    this.sellItems.forEach(sellItem => {
      tot+=sellItem.qty*sellItem.rate;
    });
    this.total=tot;
  }

  initAddCustomer(){
    this.addingCustomer=true;
  }

  saveCustomer(){
    if(this.addLock){
      return;
    }

    if(this.addName.length<3){
      alert('Please enter customer name');
      return;
    }

    if(this.addPhone.toString().length<8){
      alert('Please enter phone number');
      return;
    }

    const index=this.customers.findIndex(o=>o.phone==this.addPhone);

    if(index>-1){
      const customer=this.customers[index];
      alert(`Customer already added for phone no ${customer.phone} with name ${customer.name}`);
      return;
    }
    this.addLock=true;

    const newCustomer=new Customer({
      phone:this.addPhone,
      name:this.addName,
      area_id:this.addAreaID,
    });
    newCustomer.save()
    .then((c: Customer)=>{
      this.customers.push(newCustomer);
      this.phone=this.addPhone;
      this.addLock=false;
      this.addingCustomer=false;
      this.loadCustomerData();
    });

  }

  searchCustomer(){
    this.searchList=this.customers.filter(o=>(o.name.toLowerCase().startsWith(this.searchKeyword.toLowerCase())|| o.phone.startsWith(this.searchKeyword)) && this.CustomerManager.routeCustomers.includes(o.phone));
  }
  selectCustomer(p){
    this.phone=p;
    this.loadCustomerData();
    this.searchingCustomer=false;
  }

  renderArea(c: Customer){
    const cusArea=this.areaData.data.areas.find(o=>o.id==c.area_id);
    if(cusArea!=undefined && cusArea!=null){

      return cusArea.name;
    }else{
      return '';
    }
  }

  //XXX extra item
  addExtraItem(){
    const index=this.extraItems.findIndex(o=>o.extra_item_id==this.extra_item_id);
    const extra_item=this.ExtraItemData.data.find(o=>o.id==this.extra_item_id);
    if(index>-1){
      if(!(confirm(`${extra_item.name} already added to list do you want to update`))){
        return;
      }
    }else{
      const customer_extra_item=new ExtraItemModal(
        {
          name:extra_item.name,
          extra_item_id:this.extra_item_id,
          itemout:this.extra_item_out,
          itemin:this.extra_item_in,
          phone:this.phone,
          user_id:this.auth.user.id,
          date: this.date
        }
        );

        customer_extra_item.save()
        .then((i: ExtraItemModal)=>{
          this.extraItems.push(i);
        })
        .catch((err)=>{
          console.log(err);

          alert('Some error occured');
        });
    }
  }

}
