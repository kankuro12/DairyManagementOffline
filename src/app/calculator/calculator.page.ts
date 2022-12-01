/* eslint-disable @typescript-eslint/prefer-for-of */
import { SettingsService } from 'src/app/services/settings.service';
import { ItemlistService } from './../services/itemlist.service';
import { AuthService } from './../services/auth.service';
import { SellItemSync } from './../services/sellItemSync.services';
import { Bill } from './../database/models/bill.modal';
import { ElementRef } from '@angular/core';
/* eslint-disable eqeqeq */
import { SimpleItem } from './SimpleItem.template';
/* eslint-disable max-len */
import { SqlliteService } from 'src/app/services/sqllite.service';
import { Helper } from './../utli/helper';
import { Customer } from './../database/models/customer.modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import NepaliDate from "nepali-date";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  @ViewChild('particularInput') particularInput: ElementRef;
  @ViewChild('rateInput') rateInput: ElementRef;
  @ViewChild('qtyInput') qtyInput: ElementRef;
  @ViewChild('paidInput') paidInput: ElementRef;
  customers: Customer[] = [];
  date = '';
  curDate: number;
  //item
  items: SimpleItem[] = [];
  name = '';
  qty: number;
  rate: number;

  //total
  total = 0;
  discount = 0;
  paid = 0;
  due = 0;
  returnAmt = 0;

  //customer
  addingCustomer = false;
  addName = '';
  addPhone: number;
  addLock = false;
  phone = '';

  //search customer
  searchingCustomer = false;
  searchKeyword = '';
  searchList: Customer[] = [];
  currentCustomer: Customer;
  customerLoaded = false;
  t:  ReturnType<typeof setTimeout>;

  //saveMode
  saveMode = 1;
  noReturn = false;

  //indexing
  curIndex = 0;
  //particular management
  showSearch = false;
  selectParticular = false;

  //edit
  editingItem: SimpleItem= null;

  constructor(private db: SqlliteService,
    private sync: SellItemSync,
    private auth: AuthService,
    private api: ApiService,
    public itemList: ItemlistService,
    private setting: SettingsService) { }
  async ngOnInit() {
    this.customers = await this.db.select(Customer, "select * from customers");
    const localDate = new Date();
    const d4 = new NepaliDate(localDate);
    this.date = d4.format('YYYY-MM-DD');
    this.curDate = Helper.dateINT(this.date);
    console.log(this.curDate);
    this.searchCustomer();
  }

  calculate() {
    this.total = Helper.sum(this.items, 'total');
    const remain = this.total - this.discount - this.paid;
    if (remain > 0) {
      this.due = remain;
      this.returnAmt = 0;
    } else {
      this.returnAmt = this.noReturn ? 0 : (-1 * remain);
      this.due = 0;
    }
    console.log(this.total);
  }


  addItem() {

  }


  addToBill() {
    if (!Helper.isNumber(this.rate)) {
      alert('Please enter rate');
      this.rateInput.nativeElement.focus();
      return;
    }
    if (!Helper.isNumber(this.qty)) {
      alert('Please enter quantity');
      this.qtyInput.nativeElement.focus();
      return;

    }
    this.items.push({
      index: this.curIndex++,
      name: this.name,
      qty: this.qty,
      rate: this.rate,
      total: this.qty * this.rate
    });

    if (this.name.length > 0) {
      this.itemList.add(this.name);
    }
    this.rate = null; this.qty = null; this.name = '';
    if (this.setting.selectParticular) {
      this.particularInput.nativeElement.focus();

    } else {

      this.rateInput.nativeElement.focus();
    }
    this.calculate();
    this.itemList.clearSearch();

  }


  qtyKeyDown(e) {
    if (e.which == 13) {
      this.addToBill();
    }
  }


  saveData() {
    if (this.items.length == 0) {
      alert("Please enter at least one item");
      return;
    }
    if (this.due > 0) {
      if (!(this.customerLoaded)) {
        this.searchingCustomer = true;
        this.saveMode = 2;
        return;
      }
    }

    if (this.customerLoaded) {
      if (!(confirm('The Bill is saved to ' + this.currentCustomer.name))) {
        return;
      }
    }

    const bill = new Bill({
      name: this.currentCustomer != null ? this.currentCustomer.name : null,
      phone: this.currentCustomer != null ? this.currentCustomer.phone : null,
      particular: this.items.map(o => `${o.name} (${o.rate} X ${o.qty})`).join(','),
      total: this.total,
      paid: this.noReturn ? this.paid : (this.paid - this.returnAmt),
      discount: this.discount,
      date: this.curDate
    });
    bill.save()
      .then((newBill: Bill) => {
        console.log(newBill, 'new bill');
        this.reset();
        this.noReturn=false;
        if (this.auth.loginMode == 1) {
          this.sync.sync();
        }
      });
  }

  reset() {
    this.name = '';
    this.rate = null;
    this.qty = null;
    this.total = 0;
    this.discount = 0;
    this.paid = 0;
    this.due = 0;
    this.returnAmt = 0;
    this.searchKeyword = '';
    this.customerLoaded = false;
    this.currentCustomer = null;
    this.phone = '';
    this.items = [];
    this.searchCustomer();
  }

  delItem(id){
    const index=this.items.findIndex(o=>o.index==id);
    if (index>-1) {
      if(confirm('Delete Item from list')){
        this.items.splice(index,1);
      }
    }
  }


  initEdit(_item){
    this.editingItem={..._item};

  }

  updateItem(){
    const index=this.items.findIndex(o=>o.index==this.editingItem.index);
    if (index>-1) {
      this.editingItem.total=this.editingItem.qty*this.editingItem.rate;
      this.items[index]=this.editingItem;
      this.calculate();
      this.editingItem=null;
    }
  }

  //customer functions
  initAddCustomer() {
    this.addingCustomer = true;
  }

  saveCustomer() {
    if (this.addLock) {
      return;
    }

    if (this.addName.length < 5) {
      alert('Please enter customer name');
      return;
    }

    if (this.addPhone.toString().length != 10) {
      alert('Please enter phone number');
      return;
    }

    const index = this.customers.findIndex(o => o.phone == this.addPhone.toString());

    if (index > -1) {
      const customer = this.customers[index];
      alert(`Customer already added for phone no ${customer.phone} with name ${customer.name}`);
      return;
    }
    this.addLock = true;

    const newCustomer = new Customer({
      phone: this.addPhone.toString(),
      name: this.addName,
    });
    newCustomer.save()
      .then((c: Customer) => {
        this.customers.push(newCustomer);
        this.searchKeyword = '';
        this.phone = this.addPhone.toString();
        this.searchKeyword = this.addPhone.toString();
        this.searchCustomer();
        this.addLock = false;
        this.addingCustomer = false;
        this.searchingCustomer = false;
        this.loadCustomerData();
      });

  }

  //search customer
  async searchCustomer() {
    this.searchList = this.customers.filter(o => o.name.toLowerCase().startsWith(this.searchKeyword.toLowerCase()) || o.phone.startsWith(this.searchKeyword)).slice(0, 20);
    if(this.t!=null){
      clearTimeout(this.t);
      this.t=null;
    }
    this.t=setTimeout(()=>{
      if(this.searchList.length<20){
        this.apiSearch();
      }
    },1000);
  }

  apiSearch(){
    if(this.searchKeyword.length>1){

      this.api.post('app/customer-search',{
        keyword:this.searchKeyword,
        limit: 20-this.searchList.length,
        phones: this.searchList.map(o=>o.phone)
      })
      .subscribe(async (customerList: any[])=>{

        this.searchList=this.searchList.concat(customerList);
        for (let index = 0; index < customerList.length; index++) {
          const customer = customerList[index];
          const f = new Customer(customer);
          await f.save();
          this.customers.push(f);
        }

      });
    }
  }
  selectCustomer(p) {
    this.phone = p;
    this.searchingCustomer = false;
    this.loadCustomerData();
  }


  async loadCustomerData() {
    this.currentCustomer = this.customers.find(o => o.phone == this.phone);
    this.customerLoaded = true;
    if (this.saveMode == 2) {
      this.saveData();
    }
  }

  nameSeleted(_name) {
    this.name = _name;
    this.showSearch = false;
    this.rateInput.nativeElement.focus();
    this.itemList.clearSearch();

  }
}
