import { Component, OnInit  , Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms'; 

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
  regiForm: FormGroup;  
  FirstName:string='';   
  Address:string='';  
  Email:string='';  
  Id:number;
  addButton = false;
  editButton = false;
private dataSource:any;
userFormVisibility:boolean = false;
show_form_page:boolean = false;
userData:any;
constructor(private fb: FormBuilder , private http:HttpClient) { 
  this.regiForm = fb.group({  
    'FirstName' : [null, Validators.required],  
  
    'Address' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],  
    'Email':[null, Validators.compose([Validators.required,Validators.email])],
    'Id':[null,null]
  });  
}

  ngOnInit() {
    this.http.get('https://gorest.co.in/public-api/users?_format=json').subscribe(data => {
      this.dataSource = data;
    });
  
  }

  editUserDetails(id){
    this.loadUserForm();
    this.http.get('https://gorest.co.in/public-api/users/'+id+'?access-token=07J57KaczxBrx6q2AUrFexhcFs7e9rzjJkv7').subscribe(data => {
      this.userData = data;
      this.regiForm.patchValue({
        Id:id,
        FirstName:this.userData.result.name, 
        Address:this.userData.result.address, 
        Email:this.userData.result.email, 
      })
    });
    
  }

  deleteUserDetails(id){
    this.http.delete('https://gorest.co.in/public-api/users/'+id+'?access-token=07J57KaczxBrx6q2AUrFexhcFs7e9rzjJkv7').subscribe(data => {
      location.reload();
    });
  }

  updateUser(){
    let data ={
      "email": this.regiForm.value.Email,
      "gender": "female",
      "first_name": this.regiForm.value.FirstName,
      "last_name": this.regiForm.value.FirstName,
      "address":this.regiForm.value.Address
      
    }
    this.http.put('https://gorest.co.in/public-api/users/'+this.regiForm.value.Id+'?access-token=07J57KaczxBrx6q2AUrFexhcFs7e9rzjJkv7',data).subscribe(data => {
      location.reload();
    });
  }

  addUser(){
    let data ={
      "email": this.regiForm.value.Email,
      "gender": "female",
      "first_name": this.regiForm.value.FirstName,
      "last_name": this.regiForm.value.FirstName,
      "address":this.regiForm.value.Address
      
    }
    
    this.http.post('https://gorest.co.in/public-api/users?access-token=07J57KaczxBrx6q2AUrFexhcFs7e9rzjJkv7',data).subscribe(data => {
      location.reload();
    });
  }
  displayedColumns: string[] = ['id', 'name', 'address', 'email', 'status'];

  loadUserForm(){
    this.show_form_page = !this.show_form_page;
    this.addButton = false;
    this.editButton = true;
  }

  loadUserFormAdd(){
    this.show_form_page = !this.show_form_page;
    this.addButton = true;
    this.editButton = false;
  }

}
