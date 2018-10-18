import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { NgIf } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  actions:any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',actions:"" },
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',actions:""},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',actions:""},
 
];


@Component({
  selector: 'app-first-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})



export class UserListPageComponent implements OnInit {
private dataSource:any;
userFormVisibility:boolean = false;
show_form_page:boolean = false;
userData:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get('https://gorest.co.in/public-api/users?_format=json').subscribe(data => {
      this.dataSource = data;
    });
  
  }

  editUserDetails(id){
    this.loadUserForm();
    this.http.get('https://gorest.co.in/public-api/users/'+id+'?access-token=07J57KaczxBrx6q2AUrFexhcFs7e9rzjJkv7').subscribe(data => {
      this.userData = data;
    });
    
  }
  deleteUserDetails(id){
    this.http.delete('https://gorest.co.in/public-api/users/'+id+'?access-token=07J57KaczxBrx6q2AUrFexhcFs7e9rzjJkv7').subscribe(data => {
      location.reload();
    });
  }

  displayedColumns: string[] = ['id', 'name', 'address', 'email', 'status'];

  loadUserForm(){
    this.show_form_page = !this.show_form_page;
    if(this.userFormVisibility){
      this.userFormVisibility = false;
    } else {
      this.userFormVisibility = true;
    }
    
  }

}
